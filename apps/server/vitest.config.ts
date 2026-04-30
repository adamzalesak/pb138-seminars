import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.ts'],
  },
  // DB tests share a single Postgres connection; parallel forks would race
  // each other in beforeEach truncate. Single fork = serial test execution.
  pool: 'forks',
  poolOptions: {
    forks: {
      singleFork: true,
    },
  },
})
