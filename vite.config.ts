/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { transformScssAlias } from './src/build/buildUtils';

import * as packageJson from './package.json';
// const isDev = process.env.NODE_ENV;

const plugins = [svgr(), react(), tsconfigPaths(), dts({ entryRoot: 'src' })];

const scssFilesToTransform = ['src/**/*.scss', '!src/scss/**/*.scss', '!src/design/**', '!src/*.scss'];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  build: {
    target: ['es2019'],
    minify: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: ['src/index.ts'],
      name: 'seldon',
    },
    rollupOptions: {
      input: 'src/index.ts',
      output: [
        {
          dir: 'dist',
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
        },
      ],
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [
        copy({
          hook: 'writeBundle',
          flatten: true,
          targets: [
            // Sass entrypoint and utils
            {
              src: ['src/componentStyles.scss', 'src/scss/**/*.scss'],
              dest: ['dist/scss'],
              transform: (contents) =>
                contents
                  .toString()
                  .replace(/#scss/g, '.')
                  .replace(/\.\.\/fonts/g, '@phillips/seldon/dist/fonts'),
            },
          ],
        }),
        copy({
          hook: 'writeBundle',
          flatten: false,
          targets: [
            // Sass components
            {
              src: scssFilesToTransform,
              dest: ['dist/scss'],
              transform: transformScssAlias,
            },
          ],
        }),
        peerDepsExternal(),
      ],
    },
  },
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
      ], // ignore barrel files
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
