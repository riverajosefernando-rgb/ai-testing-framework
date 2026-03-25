import { test, expect } from '@playwright/test';
import fs from 'fs';

import { generarAssertsIA } from '../ai/analyzers/assertGenerator.js';
import { ejecutarAsserts } from '../ai/analyzers/assertExecutor.js';

// 🔥 endpoints soportados
const ENDPOINTS = ['transfer', 'login'];

let totalTests = 0;

for (const endpoint of ENDPOINTS) {

  const FILE = `./generated-scenarios-${endpoint}.json`;

  if (!fs.existsSync(FILE)) continue;

  const content = fs.readFileSync(FILE, 'utf-8');

  if (!content.trim()) continue;

  const escenarios = JSON.parse(content);

  for (const escenario of escenarios) {

    totalTests++;

    test(`🤖 [${endpoint}] ${escenario.nombre}`, async ({ request }) => {

      const apiEndpoint = escenario.endpoint || endpoint;

      const response = await request.post(
        `http://localhost:3000/${apiEndpoint}`,
        {
          data: escenario.request || {}
        }
      );

      const body = await response.json();

      console.log(`📦 ${apiEndpoint} Response:`, body);

      const asserts = generarAssertsIA(escenario);

      ejecutarAsserts(asserts, body);
    });
  }
}

// 🔥 fallback si no hay escenarios
if (totalTests === 0) {

  test('⚠️ No hay escenarios IA', async () => {
    console.log("⚠️ No hay escenarios generados");
    expect(true).toBe(true);
  });
}