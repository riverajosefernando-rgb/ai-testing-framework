import { test } from '@playwright/test';
import fs from 'fs';

// 🧠 IA asserts
import { generarAssertsIA } from '../ai/analyzers/assertGenerator.js';
import { ejecutarAsserts } from '../ai/analyzers/assertExecutor.js';

// 🧠 Validación de tipos
import { generarAssertsDeTipo } from '../ai/analyzers/typeValidator.js';

// 📸 Baseline
import { getBaseline } from '../ai/baseline/baselineManager.js';

// 📁 endpoints soportados
const ENDPOINTS = ['transfer', 'login'];

test('🤖 Ejecutar escenarios generados por IA', async ({ request }) => {

  let totalEscenarios = 0;

  for (const endpoint of ENDPOINTS) {

    const FILE = `./generated-scenarios-${endpoint}.json`;

    if (!fs.existsSync(FILE)) {
      console.log(`⚠️ No hay escenarios para ${endpoint}`);
      continue;
    }

    const content = fs.readFileSync(FILE, 'utf-8');

    if (!content.trim()) {
      console.log(`⚠️ Archivo vacío para ${endpoint}`);
      continue;
    }

    const escenarios = JSON.parse(content);

    console.log(`\n🧠 Ejecutando ${escenarios.length} escenarios IA para ${endpoint}`);

    // 📸 baseline por endpoint
    const baseline = getBaseline(endpoint);

    for (const escenario of escenarios) {

      // 💣 VALIDACIÓN CRÍTICA (ANTI-CONTAMINACIÓN)
      if (escenario.endpoint && escenario.endpoint !== endpoint) {
        console.warn(`⚠️ Escenario ignorado (endpoint incorrecto): ${escenario.nombre}`);
        continue;
      }

      totalEscenarios++;

      console.log(`\n🚀 Ejecutando: ${escenario.nombre} (${endpoint})`);

      try {

        // 💣 FORZAR endpoint correcto
        const apiEndpoint = endpoint;

        const response = await request.post(
          `http://localhost:3000/${apiEndpoint}`,
          {
            data: escenario.request || {}
          }
        );

        const body = await response.json();

        console.log(`📦 ${apiEndpoint} Response:`, body);

        // 🧠 1. Asserts IA (cambios)
        const assertsIA = generarAssertsIA(escenario);
        console.log("🧠 Asserts IA:", assertsIA);

        // 🧠 2. Asserts de tipo
        let assertsTipo = [];

        if (baseline) {
          assertsTipo = generarAssertsDeTipo(baseline, body);
          console.log("🧠 Asserts tipo:", assertsTipo);
        }

        // 💣 Ejecutar asserts
        ejecutarAsserts([...assertsIA, ...assertsTipo], body);

      } catch (error) {

        console.error(`❌ Error en escenario: ${escenario.nombre} (${endpoint})`);
        console.error(error);

        throw error;
      }
    }
  }

  if (totalEscenarios === 0) {
    console.log("⚠️ No hay escenarios IA en ningún endpoint");
  }
});