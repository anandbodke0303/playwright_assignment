import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  workers: 1,
  testDir: './tests',
  reporter: [['html', { outputFolder: 'test-report' }]],
  use: {
    headless: false,
    slowMo: 5000,
    viewport: { width: 1400, height: 900 },
    video: 'retain-on-failure',
    trace: 'on'
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /repository_api/,
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      testIgnore: /repository_api/,
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      testIgnore: /repository_api/,
      use: { browserName: 'webkit' },
    },
    {
      name: 'chromium-api',
      testMatch: /repository_api/,
      use: { browserName: 'chromium' },
    },
  ],
});
