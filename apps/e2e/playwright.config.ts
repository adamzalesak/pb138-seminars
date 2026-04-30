import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: isCI ? 2 : 0,
  workers: 1,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Boot the API + SPA automatically. `db:migrate` runs against the test DB
  // first so the schema exists before the server starts.
  webServer: [
    {
      // Migrate schema, seed sample data, then start the API. Seed data is
      // what the E2E spec asserts on (e.g. courses showing up in the list).
      command: 'bun run db:migrate && bun run db:seed && bun run dev',
      cwd: '../server',
      url: 'http://localhost:3000/api-docs',
      reuseExistingServer: !isCI,
      timeout: 60_000,
      env: {
        DATABASE_URL:
          process.env.DATABASE_URL_E2E ??
          'postgresql://postgres:postgres@localhost:5432/pb138_test',
        FRONTEND_URL: 'http://localhost:5173',
        PORT: '3000',
      },
    },
    {
      command: 'bun run dev',
      cwd: '../web',
      url: 'http://localhost:5173',
      reuseExistingServer: !isCI,
      timeout: 60_000,
      env: {
        VITE_API_URL: 'http://localhost:3000',
      },
    },
  ],
})
