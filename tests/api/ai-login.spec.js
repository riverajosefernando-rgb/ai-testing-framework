import { test, expect } from '@playwright/test';

// 🧠 AI
import { getAIProvider } from '../ai/aiFactory.js';

import { BASE_URL } from '../config/environment.js';


// 📸 Baseline
import { saveBaseline, getBaseline } from '../ai/baseline/baselineManager.js';

// 🔍 Change detection
import { detectBreakingChanges } from '../ai/analyzers/changeAnalyzer.js';

// 🧠 History learning
import { aprenderDelHistorial, filtrarCambiosRecurrentes } from '../ai/analyzers/historyLearner.js';

// 🤖 Escenarios
import { generarEscenariosDesdeCambios } from '../ai/generators/scenarioEnhancer.js';
import { saveGeneratedScenarios } from '../ai/generators/scenarioStorage.js';

// 🧾 Historial
import { saveHistory } from '../ai/history/historyManager.js';
import { getHistory } from '../ai/history/historyReader.js';

// 📊 Reporte
import { printAIReport } from '../ai/reporters/aiReporter.js';

test('🧠 AI Testing - LOGIN API', async ({ request }) => {

  const ai = getAIProvider();

  // 🚀 1. Llamar API
  const response = await request.post(`${BASE_URL}/login`, {
    data: {
      user: "test",
      password: "1234"
    }
  });

  const body = await response.json();

  console.log("\n📦 LOGIN Response:", body);

  // 🧠 2. Análisis IA
  const analysis = await ai.analyzeResponse(body);

  // 📸 3. Baseline
  const baseline = getBaseline('login');

  let changes = null;

  if (!baseline) {
    console.log("📸 Guardando baseline LOGIN...");
    saveBaseline('login', body);
  } else {

    changes = detectBreakingChanges(baseline, body);

    // 🧠 Aprender historial
    const history = getHistory('login');
    const frecuencia = aprenderDelHistorial(history);

    // 💣 Filtrar ruido
    if (changes?.changes?.length) {
      changes.changes = filtrarCambiosRecurrentes(
        changes.changes,
        frecuencia
      );
    }

    // 🔥 FIX CRÍTICO
    if (!changes?.changes?.length) {
      changes.riskLevel = 'LOW';
      console.log("🧠 LOGIN: cambios ya aprendidos");
    }
  }

  // 📊 4. Reporte
  printAIReport({ analysis, changes });

  // 🧾 5. Historial
  if (changes?.changes?.length) {
    saveHistory('login', {
      changes: changes.changes,
      riskLevel: changes.riskLevel
    });

    console.log("📦 Cambios LOGIN:", changes.changes);
  }

  // 🤖 6. Generar escenarios
  if (changes?.changes?.length) {

    const escenarios = generarEscenariosDesdeCambios(changes.changes, 'transfer');

    console.log("\n🤖 Escenarios LOGIN:");
    escenarios.forEach(e => {
      console.log(`- ${e.nombre}`);
    });

    saveGeneratedScenarios(escenarios, 'login');
  }

  // 💣 Validación base
  expect(body).toBeTruthy();

});