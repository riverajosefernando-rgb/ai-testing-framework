import fs from 'fs';
import { generarEscenarios } from '../tests/ai/generators/testGenerator.js';

async function generarTests() {

  const data = await generarEscenarios('/api/transfer');

  const casos = data.casos || [];

  let content = `
import { test, expect } from '@playwright/test';

test.describe('🤖 AI Generated Tests', () => {
`;

  casos.forEach((caso, index) => {

    content += `
  test('${caso.nombre}', async ({ request }) => {
    const response = await request.get('/api/transfer');
    expect(response.status()).toBe(200);

    const body = await response.json();

    ${caso.expected?.status ? `expect(body.status).toBe('${caso.expected.status}');` : ''}
    ${caso.expected?.code ? `expect(body.code).toBe(${caso.expected.code});` : ''}
  });
`;
  });

  content += `});`;

  fs.writeFileSync('tests/api/generated.spec.js', content);

  console.log("✅ Tests generados automáticamente");
}

generarTests();