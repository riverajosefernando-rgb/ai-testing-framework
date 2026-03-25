import { test, expect } from '@playwright/test';
import fs from 'fs';

import { generarAssertsIA } from '../ai/analyzers/assertGenerator.js';
import { ejecutarAsserts } from '../ai/analyzers/assertExecutor.js';

const FILE = './generated-scenarios.json';

if (fs.existsSync(FILE)) {

  const escenarios = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

  for (const escenario of escenarios) {

    test(`🤖 ${escenario.nombre}`, async ({ request }) => {

      const response = await request.post('http://localhost:3000/transfer', {
        data: escenario.request || {}
      });

      const body = await response.json();

      const asserts = generarAssertsIA(escenario);

      ejecutarAsserts(asserts, body);
    });
  }

} else {

  test('⚠️ No hay escenarios IA', async () => {
    expect(true).toBe(true);
  });

}