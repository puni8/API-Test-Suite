import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true
    }]
  ],
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
  },
});

