import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

import * as packageJson from './package.json';

// const isDev = process.env.NODE_ENV;

const plugins = [svgr(), react(), dts({ entryRoot: 'src' })];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: [
      {
        find: './vars',
        replacement: resolve(__dirname, './src/scss/vars'),
      },
      {
        find: '../../vars',
        replacement: resolve(__dirname, './src/scss/vars'),
      },
      {
        find: './typography',
        replacement: resolve(__dirname, './src/scss/typography'),
      },
      {
        find: '../../typography',
        replacement: resolve(__dirname, './src/scss/typography'),
      },
      {
        find: './reset',
        replacement: resolve(__dirname, './src/scss/reset'),
      },
      {
        find: './_utils',
        replacement: resolve(__dirname, './src/scss/_utils'),
      },
      {
        find: '../../_utils',
        replacement: resolve(__dirname, './src/scss/_utils'),
      },
      {
        find: './type',
        replacement: resolve(__dirname, './src/scss/type'),
      },
      {
        find: '../../type',
        replacement: resolve(__dirname, './src/scss/type'),
      },
    ],
  },
  css: {
    devSourcemap: true,
  },
  build: {
    minify: true,
    reportCompressedSize: true,
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
              src: ['src/styles.scss', 'src/scss/**/*.scss'],
              dest: ['dist/scss'],
            },
          ],
        }),
        copy({
          hook: 'writeBundle',
          flatten: false,
          targets: [
            // Sass components
            {
              src: ['src/components/**/*.scss', 'src/pages/**/*.scss'],
              dest: ['dist/scss'],
            },
          ],
        }),
        peerDepsExternal(),
      ],
    },
  },
});
