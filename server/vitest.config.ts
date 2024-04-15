import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
  test: {
    globals: true,
    setupFiles: ['./src/setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'clover', 'json'],
    },
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.toml' },
      },
    },
  },
})
