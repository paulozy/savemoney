import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    alias: {
      '@core/': 'src/core',
      '@test/': './ test/*',
    }
  },
})
