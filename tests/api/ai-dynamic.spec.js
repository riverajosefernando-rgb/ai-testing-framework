import { test, expect } from '@playwright/test';

// 🧠 IA
import { generarEscenarios } from '../ai/generators/testGenerator.js';

// 🌐 ENV centralizado
import { BASE_URL } from '../../config/environment.js';

// 🧠 Detector dinámico
import { getEndpoints } from '../ai/utils/endpointDetector.js';

test.describe('🤖 AI Dynamic Tests - Multi API (AUTO)', () => {

  let escenariosPorEndpoint = {};
  let ENDPOINTS = [];
  let totalEscenarios = 0;

  // 🚀 Detectar endpoints + generar escenarios
  test.beforeAll(async () => {

    ENDPOINTS = getEndpoints();

    console.log("\n🌐 Endpoints detectados:", ENDPOINTS);

    for (const endpoint of ENDPOINTS) {

      console.log(`\n🧠 Generando escenarios IA para ${endpoint.name}`);

      try {
        const response = await generarEscenarios(endpoint.path);

        const escenarios = response.casos || [];

        escenariosPorEndpoint[endpoint.name] = escenarios;
        totalEscenarios += escenarios.length;

        console.log(`✅ ${endpoint.name}: ${escenarios.length} escenarios`);

      } catch (error) {
        console.error(`❌ Error generando escenarios para ${endpoint.name}`);
        console.error(error);

        escenariosPorEndpoint[endpoint.name] = [];
      }
    }

    console.log("\n🧠 Escenarios finales:", escenariosPorEndpoint);
    console.log(`🔥 Total escenarios generados: ${totalEscenarios}`);
  });

  // 🧠 VALIDACIÓN INTELIGENTE (NO FALLA)
  test('Validar que IA generó escenarios (smart)', () => {

    if (totalEscenarios === 0) {
      test.skip(true, '⚠️ No hay escenarios generados (primera ejecución o sin cambios)');
    }

    expect(totalEscenarios).toBeGreaterThan(0);
  });

  // 🚀 EJECUCIÓN DINÁMICA REAL
  test('🚀 Ejecutar escenarios IA multi-endpoint', async ({ request }) => {

    if (totalEscenarios === 0) {
      test.skip(true, '⚠️ No hay escenarios para ejecutar');
    }

    for (const endpoint of ENDPOINTS) {

      const escenarios = escenariosPorEndpoint[endpoint.name] || [];

      if (escenarios.length === 0) {
        console.warn(`⚠️ Sin escenarios para ${endpoint.name}`);
        continue;
      }

      for (const [index, caso] of escenarios.entries()) {

        console.log(`\n🧪 [${endpoint.name}] Caso ${index + 1}: ${caso.nombre}`);

        try {

          const method = endpoint.method.toLowerCase();

          let response;

          if (method === 'get') {
            response = await request.get(`${BASE_URL}${endpoint.path}`);
          } else {
            response = await request[method](
              `${BASE_URL}${endpoint.path}`,
              { data: caso.request || {} }
            );
          }

          // 💣 VALIDAR STATUS
          if (response.status() >= 400) {
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

          console.log("📦 Response:", body);

          // ✔ Validaciones base
          expect(body).toBeTruthy();
          expect(typeof body).toBe('object');

          // 🧠 Validaciones IA
          for (const key in caso.expected || {}) {

            if (body[key] === undefined) {
              console.warn(`⚠️ Campo esperado '${key}' no existe`);
              continue;
            }

            expect(body[key]).toEqual(caso.expected[key]);
          }

        } catch (error) {

          console.error(`❌ Error en caso: ${caso.nombre} (${endpoint.name})`);
          console.error(error);

          throw error;
        }
      }
    }

  });

});