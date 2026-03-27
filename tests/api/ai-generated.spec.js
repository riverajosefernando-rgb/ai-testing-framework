import { test } from '@playwright/test';
import fs from 'fs';

// 🧠 IA asserts
import { generarAssertsIA } from '../ai/analyzers/assertGenerator.js';
import { ejecutarAsserts } from '../ai/analyzers/assertExecutor.js';

// 🧠 Validación de tipos
import { generarAssertsDeTipo } from '../ai/analyzers/typeValidator.js';

// 📸 Baseline
import { getBaseline } from '../ai/baseline/baselineManager.js';

// 🌐 ENV
import { BASE_URL } from '../../config/environment.js';

// 🧠 Detector dinámico
import { getEndpoints } from '../ai/utils/endpointDetector.js';

test('🤖 Ejecutar escenarios generados por IA (AUTO)', async ({ request }) => {

  const ENDPOINTS = getEndpoints();

  let totalEscenarios = 0;

  for (const endpointConfig of ENDPOINTS) {

    const endpointName = endpointConfig.name;
    const endpointPath = endpointConfig.path;
    const method = endpointConfig.method.toLowerCase();

    const FILE = `./generated-scenarios-${endpointName}.json`;

    if (!fs.existsSync(FILE)) {
      console.log(`⚠️ No hay escenarios para ${endpointName}`);
      continue;
    }

    const content = fs.readFileSync(FILE, 'utf-8');

    if (!content.trim()) {
      console.log(`⚠️ Archivo vacío para ${endpointName}`);
      continue;
    }

    let escenarios = [];

    try {
      escenarios = JSON.parse(content);
    } catch (error) {
      console.error(`❌ JSON corrupto en ${FILE}`);
      continue;
    }

    console.log(`\n🧠 Ejecutando ${escenarios.length} escenarios IA para ${endpointName}`);

    // 📸 baseline por endpoint
    const baseline = getBaseline(endpointName);

    for (const escenario of escenarios) {

      // 💣 ANTI-CONTAMINACIÓN
      if (escenario.endpoint && escenario.endpoint !== endpointName) {
        console.warn(`⚠️ Escenario ignorado: ${escenario.nombre}`);
        continue;
      }

      totalEscenarios++;

      console.log(`\n🚀 Ejecutando: ${escenario.nombre} (${endpointName})`);

      try {

        let response;

        // 🔥 MÉTODO DINÁMICO
        if (method === 'get') {
          response = await request.get(`${BASE_URL}${endpointPath}`);
        } else {
          response = await request[method](
            `${BASE_URL}${endpointPath}`,
            {
              data: escenario.request || {}
            }
          );
        }

        // 💣 VALIDAR STATUS
        if (response.status() >= 500) {
          const errorText = await response.text();
          throw new Error(`❌ API Error ${response.status()} → ${errorText}`);
        }

        // 💣 VALIDAR JSON
        const contentType = response.headers()['content-type'] || '';

        let body;

        if (contentType.includes('application/json')) {
          body = await response.json();
        } else {
          const text = await response.text();
          throw new Error(`❌ Respuesta no es JSON → ${text}`);
        }

        console.log(`📦 ${endpointName} Response:`, body);

        // 🧠 1. Asserts IA
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

        console.error(`❌ Error en escenario: ${escenario.nombre} (${endpointName})`);
        console.error(error);

        throw error;
      }
    }
  }

  // 🔥 fallback inteligente
  if (totalEscenarios === 0) {
    console.log("⚠️ No hay escenarios IA en ningún endpoint");
  }

});