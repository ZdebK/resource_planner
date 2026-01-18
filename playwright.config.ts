import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  testMatch: /.*\.spec\.(js|ts)/,
  // Optionally, ignore all __tests__ folders
  testIgnore: ['src/app/__tests__/**'],
  use: {
    headless: false, // show browser UI
  },
  workers: 1, // run tests one after another so you can watch
  forbidOnly: false,
  retries: 0,
  // Zatrzymaj na pierwszym błędzie
  bail: 1,
});
