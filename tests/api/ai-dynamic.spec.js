import { test, expect } from '@playwright/test';
import { generarEscenarios } from '../ai/generators/testGenerator.js';

let escenarios = [];

// 🔥 Cargar escenarios antes de los tests
test.beforeAll(async () => {
  const response = await generarEscenarios('/api/transfer');

  escenarios = response.casos || [];

  console.log("🧠 Escenarios cargados:", escenarios);
});

// 💣 Generar tests dinámicos
test.describe('🤖 AI Dynamic Tests - Transfer', () => {

  test('Validar que IA generó escenarios', () => {
    expect(escenarios.length).toBeGreaterThan(0);
  });

  test.describe('🚀 Casos dinámicos', () => {

    escenarios.forEach((caso, index) => {

      test(`Caso ${index + 1}: ${caso.nombre}`, async ({ request }) => {

        console.log("🧪 Ejecutando caso:", caso.nombre);

        const response = await request.get('/api/transfer');

        expect(response.status()).toBe(200);

        const body = await response.json();

        // 🔥 Validación dinámica
        if (caso.expected?.status) {
          expect(body.status).toBe(caso.expected.status);
        }

        if (caso.expected?.code) {
          expect(body.code).toBe(caso.expected.code);
        }

      });

    });

  });

});