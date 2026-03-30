import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,

  testDir: './tests',

  globalSetup: './tests/setup/globalSetup.js',
  globalTeardown: './tests/setup/globalTeardown.js',

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },

  reporter: [
    ['list'],

    ['html', {
      open: 'never',
      outputFolder: 'playwright-report'
    }],

    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ],
});