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
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
