import { test, expect } from '@playwright/test';

// 🧠 AI
import { getAIProvider } from '../ai/aiFactory.js';

// ⚙️ Config
import { AI_MODE, AI_MODES } from '../config/aiConfig.js';

// 📸 Baseline
import { saveBaseline, getBaseline } from '../ai/baseline/baselineManager.js';

// 🔍 Change detection
import { detectBreakingChanges } from '../ai/analyzers/changeAnalyzer.js';

// 🧠 History learning
import { aprenderDelHistorial, filtrarCambiosRecurrentes } from '../ai/analyzers/historyLearner.js';

// 📊 Reporter consola
import { printAIReport } from '../ai/reporters/aiReporter.js';

// 🧾 Historial
import { saveHistory } from '../ai/history/historyManager.js';
import { getHistory } from '../ai/history/historyReader.js';

// 🤖 Generación de escenarios
import { generarEscenariosDesdeCambios } from '../ai/generators/scenarioEnhancer.js';
import { saveGeneratedScenarios } from '../ai/generators/scenarioStorage.js';

// 📊 Dashboard HTML
import { generateHTMLReport } from '../ai/reporters/htmlReporter.js';

// 🚀 Abrir dashboard
import { openReport } from '../utils/openReport.js';

test('🧠 AI Testing Nivel 4 - Autonomous Engine', async ({ request }) => {

  const ai = getAIProvider();

  // 🚀 1. Ejecutar API
  const response = await request.post('http://localhost:3000/transfer', {
    data: {
      fromAccount: "123",
      toAccount: "456",
      amount: 100
    }
  });

  const body = await response.json();

  console.log("\n📦 Response:", body);

  // 🧠 2. Análisis IA
  const analysis = await ai.analyzeResponse(body);

  // 📸 3. Baseline
  const baseline = getBaseline('transfer');

  let changes = null;

  if (!baseline) {
    console.log("\n📸 Guardando baseline inicial...");
    saveBaseline('transfer', body);
  } else {

    changes = detectBreakingChanges(baseline, body);

    // 🧠 Aprendizaje del historial
    const history = getHistory('transfer');
    const frecuencia = aprenderDelHistorial(history);

    // 💣 Filtrar cambios repetidos
    if (changes?.changes?.length) {
      changes.changes = filtrarCambiosRecurrentes(
        changes.changes,
        frecuencia
      );
    }

    // 🔥 EXTRA CLAVE — Recalcular riesgo
    if (!changes?.changes?.length) {
      changes.riskLevel = 'LOW';
      console.log("🧠 Todos los cambios fueron aprendidos (historial)");
    }
  }

  // 📊 4. Reporte
  printAIReport({ analysis, changes });

  // 🧾 5. Historial
  if (changes?.changes?.length) {

    saveHistory('transfer', {
      changes: changes.changes,
      riskLevel: changes.riskLevel
    });

    console.log("📦 Cambios detectados:", changes.changes);
  }

  // 🤖 6. Generar + guardar escenarios IA
  if (changes?.changes?.length) {

    const nuevosEscenarios = generarEscenariosDesdeCambios(changes.changes);

    console.log("\n🤖 Nuevos escenarios generados:");
    nuevosEscenarios.forEach(e => {
      console.log(`- ${e.nombre}: ${e.descripcion}`);
    });

    saveGeneratedScenarios(nuevosEscenarios);

    console.log("🧠 Escenarios a guardar:", nuevosEscenarios);
  }

  // 📊 7. Dashboard
  const historyFinal = getHistory('transfer');

  if (historyFinal.length > 0) {

    generateHTMLReport(historyFinal);

    // 🚀 abrir solo si hay cambios críticos
    if (changes?.riskLevel === 'HIGH') {
      setTimeout(() => {
        openReport();
      }, 1000);
    }
  }

  // 💣 8. VALIDACIONES INTELIGENTES

  console.log(`🧠 AI MODE: ${AI_MODE.toUpperCase()}`);

  // ✅ Validación IA
  expect(['LOW', 'MEDIUM']).toContain(analysis.riskLevel);

  if (changes) {

    // 🔴 STRICT
    if (AI_MODE === AI_MODES.STRICT) {
      expect(changes.riskLevel).not.toBe('HIGH');
    }

    // 🟡 FLEXIBLE
    if (AI_MODE === AI_MODES.FLEXIBLE) {
      if (changes.riskLevel === 'HIGH') {
        console.warn("⚠️ Cambios críticos detectados, revisar dashboard IA");
      }
    }

    // 🟢 LEARNING
    if (AI_MODE === AI_MODES.LEARNING) {
      if (changes.riskLevel === 'HIGH') {
        console.warn("🧠 Aprendiendo nuevo baseline...");
        saveBaseline('transfer', body);
      }
    }
  }

});