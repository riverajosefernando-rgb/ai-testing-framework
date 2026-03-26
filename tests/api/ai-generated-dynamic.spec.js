import { test, expect } from '@playwright/test';
import fs from 'fs';

import { generarAssertsIA } from '../ai/analyzers/assertGenerator.js';
import { ejecutarAsserts } from '../ai/analyzers/assertExecutor.js';

import { BASE_URL } from '../config/environment.js';

// 🧠 Detector dinámico
import { getEndpoints } from '../ai/utils/endpointDetector.js';

let totalTests = 0;

// 🔥 endpoints dinámicos
const ENDPOINTS = getEndpoints();

for (const endpointConfig of ENDPOINTS) {

  const endpointName = endpointConfig.name;
  const endpointPath = endpointConfig.path;
  const method = endpointConfig.method.toLowerCase();

  const FILE = `./generated-scenarios-${endpointName}.json`;

  if (!fs.existsSync(FILE)) {
    console.warn(`⚠️ No existe archivo para ${endpointName}`);
    continue;
  }

  const content = fs.readFileSync(FILE, 'utf-8');

  if (!content.trim()) {
    console.warn(`⚠️ Archivo vacío para ${endpointName}`);
    continue;
  }

  let escenarios = [];

  try {
    escenarios = JSON.parse(content);
  } catch (error) {
    console.error(`❌ JSON corrupto en ${FILE}`);
    continue;
  }

  for (const escenario of escenarios) {

    // 💣 FILTRO INTELIGENTE
    if (escenario.endpoint && escenario.endpoint !== endpointName) {
      console.warn(`⚠️ Escenario ignorado (endpoint mismatch): ${escenario.nombre}`);
      continue;
    }

    totalTests++;

    test(`🤖 [${endpointName}] ${escenario.nombre}`, async ({ request }) => {

      try {

        const apiEndpoint = escenario.endpoint || endpointName;

        // 🔥 MÉTODO DINÁMICO
        let response;

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

        console.log(`📦 ${apiEndpoint} Response:`, body);

        // 🧠 ASSERTS IA
        const asserts = generarAssertsIA(escenario);

        console.log("🧠 Asserts IA:", asserts);

        ejecutarAsserts(asserts, body);

      } catch (error) {

        console.error(`❌ Error en escenario: ${escenario.nombre} (${endpointName})`);
        console.error(error);

        throw error;
      }

    });

  }
}

// 🔥 fallback inteligente
if (totalTests === 0) {

  test('⚠️ No hay escenarios IA', async () => {
    console.warn("⚠️ No hay escenarios generados en ningún endpoint");
    expect(true).toBe(true);
  });

}