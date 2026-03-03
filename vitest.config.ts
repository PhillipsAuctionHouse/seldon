import { mergeConfig } from 'vite';

import viteConfig from './vite.config';

export default mergeConfig(viteConfig, {
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build', 'coverage', 'public', 'scripts', 'storybook', '.template/**/*.{ts,tsx}'],
    setupFiles: ['./config/vitest/setupTest.ts'],
    restoreMocks: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/design/**/*.{ts,tsx}',
        '.template/**/*.{ts,tsx}',
        '**/index.ts',
        '**/types.ts',
        '**/assets/**',
        '**/testUtils.tsx',
      ],
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
      thresholds: {
        branches: 90,
        lines: 90,
        functions: 90,
        statements: 90,
      },
      all: true,
    },
  },
});
