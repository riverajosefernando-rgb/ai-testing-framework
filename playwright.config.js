import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1, // Ejecutar tests de forma secuencial para evitar conflictos con archivos de historial
 
  testDir: './tests',

  globalSetup: './setup/globalSetup.js',
  globalTeardown: './setup/globalTeardown.js',

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

});