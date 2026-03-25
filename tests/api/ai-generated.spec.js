import { test } from '@playwright/test';
import fs from 'fs';

// 🧠 IA asserts
import { generarAssertsIA } from '../ai/analyzers/assertGenerator.js';
import { ejecutarAsserts } from '../ai/analyzers/assertExecutor.js';

// 🧠 Validación de tipos
import { generarAssertsDeTipo } from '../ai/analyzers/typeValidator.js';

// 📸 Baseline
import { getBaseline } from '../ai/baseline/baselineManager.js';

const FILE = './generated-scenarios.json';

test('🤖 Ejecutar escenarios generados por IA', async ({ request }) => {

  if (!fs.existsSync(FILE)) {
    console.log("⚠️ No hay escenarios generados");
    return;
  }

  const content = fs.readFileSync(FILE, 'utf-8');

  if (!content.trim()) {
    console.log("⚠️ Archivo de escenarios vacío");
    return;
  }

  const escenarios = JSON.parse(content);

  console.log(`🧠 Ejecutando ${escenarios.length} escenarios IA`);

  // 📸 Obtener baseline (para tipos)
  const baseline = getBaseline('transfer');

  for (const escenario of escenarios) {

    console.log(`\n🚀 Ejecutando: ${escenario.nombre}`);

    try {

      const response = await request.post('http://localhost:3000/transfer', {
        data: escenario.request || {}
      });

      const body = await response.json();

      console.log("📦 Response:", body);

      // 🧠 1. Asserts por IA (cambios)
      const assertsIA = generarAssertsIA(escenario);

      console.log("🧠 Asserts IA:", assertsIA);

      // 🧠 2. Asserts de tipo (baseline vs actual)
      let assertsTipo = [];

      if (baseline) {
        assertsTipo = generarAssertsDeTipo(baseline, body);
        console.log("🧠 Asserts tipo:", assertsTipo);
      }

      // 💣 Ejecutar TODO
      ejecutarAsserts([...assertsIA, ...assertsTipo], body);

    } catch (error) {

      console.error(`❌ Error en escenario: ${escenario.nombre}`);
      console.error(error);

      throw error; // 🔥 importante para que falle el test
    }
  }
});