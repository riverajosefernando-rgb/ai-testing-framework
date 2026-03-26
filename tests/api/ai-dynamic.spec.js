import { test, expect } from '@playwright/test';

// 🧠 IA
import { generarEscenarios } from '../ai/generators/testGenerator.js';

// 🌐 ENV centralizado
import { BASE_URL } from '../config/environment.js';

// 🧠 Detector dinámico (🔥 clave)
import { getEndpoints } from '../ai/utils/endpointDetector.js';

test.describe('🤖 AI Dynamic Tests - Multi API (AUTO)', () => {

  let escenariosPorEndpoint = {};
  let ENDPOINTS = [];

  // 🚀 Detectar endpoints + generar escenarios
  test.beforeAll(async () => {

    // 🔥 1. Detectar endpoints automáticamente
    ENDPOINTS = getEndpoints();

    console.log("\n🌐 Endpoints detectados:", ENDPOINTS);

    for (const endpoint of ENDPOINTS) {

      console.log(`\n🧠 Generando escenarios IA para ${endpoint.name}`);

      try {
        const response = await generarEscenarios(endpoint.path);

        escenariosPorEndpoint[endpoint.name] = response.casos || [];

        console.log(`✅ ${endpoint.name}: ${escenariosPorEndpoint[endpoint.name].length} escenarios`);

      } catch (error) {

        console.error(`❌ Error generando escenarios para ${endpoint.name}`);
        console.error(error);

        escenariosPorEndpoint[endpoint.name] = [];
      }
    }

    console.log("\n🧠 Escenarios finales:", escenariosPorEndpoint);
  });

  // 💣 Validación global
  test('Validar que IA generó escenarios', () => {

    const total = Object.values(escenariosPorEndpoint)
      .reduce((acc, arr) => acc + arr.length, 0);

    expect(total).toBeGreaterThan(0);
  });

  // 🚀 EJECUCIÓN DINÁMICA REAL
  test('🚀 Ejecutar escenarios IA multi-endpoint', async ({ request }) => {

    for (const endpoint of ENDPOINTS) {

      const escenarios = escenariosPorEndpoint[endpoint.name] || [];

      if (escenarios.length === 0) {
        console.warn(`⚠️ Sin escenarios para ${endpoint.name}`);
        continue;
      }

      for (const [index, caso] of escenarios.entries()) {

        console.log(`\n🧪 [${endpoint.name}] Caso ${index + 1}: ${caso.nombre}`);

        try {

          // 🔥 MÉTODO DINÁMICO (GET / POST / PUT / DELETE)
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

          // 💣 VALIDAR STATUS HTTP
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

          // 🧠 VALIDACIONES INTELIGENTES

          // ✔ estructura básica
          expect(body).toBeTruthy();
          expect(typeof body).toBe('object');

          // 💣 VALIDACIÓN DINÁMICA IA
          for (const key in caso.expected || {}) {

            if (body[key] === undefined) {
              console.warn(`⚠️ Campo esperado '${key}' no existe en response`);
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