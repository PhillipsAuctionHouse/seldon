import { mergeConfig } from 'vite';
import viteConfig from './vite.config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default mergeConfig(viteConfig, {
  test: {
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
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          include: ['**/*.test.{js,jsx,ts,tsx}'],
          exclude: [
            'node_modules',
            'dist',
            'build',
            'coverage',
            'public',
            'scripts',
            'storybook',
            '.template/**/*.{ts,tsx}',
          ],
          setupFiles: ['./config/vitest/setupTest.ts'],
          restoreMocks: true,
        },
      },
      {
        extends: true,
        resolve: {
          alias: {
            '~scss': path.join(dirname, 'src/scss'),
          },
        },
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
