import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { transformScssAlias } from './src/build/buildUtils';

import * as packageJson from './package.json';

const dirname = path.dirname(fileURLToPath(import.meta.url));
// const isDev = process.env.NODE_ENV;

const plugins = [svgr(), react(), tsconfigPaths(), dts({ entryRoot: 'src' })];

const scssFilesToTransform = ['src/**/*.scss', '!src/scss/**/*.scss', '!src/design/**', '!src/*.scss'];

/** Vite lib mode strips CSS side-effect imports to `/* empty css *\/`. Put them back. */
function preserveCssImports() {
  return {
    name: 'preserve-css-imports',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue;
        const cssFiles = chunk.viteMetadata?.importedCss;
        if (!cssFiles?.size) continue;
        const dir = path.posix.dirname(chunk.fileName);
        const stmts = [...cssFiles].map((cssFile) => {
          let rel = path.posix.relative(dir, cssFile);
          if (!rel.startsWith('.')) rel = `./${rel}`;
          return chunk.fileName.endsWith('.cjs') ? `require('${rel}');` : `import '${rel}';`;
        });
        chunk.code = chunk.code.replace(/\/\*\s*empty css[\s\S]*?\*\//g, '');
        chunk.code = `${stmts.join('\n')}\n${chunk.code}`;
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: {
      '~scss': path.resolve(dirname, 'src/scss'),
    },
  },
  build: {
    target: ['es2020'],
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
        {
          dir: 'dist',
          format: 'cjs',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          chunkFileNames: '[name].cjs',
          entryFileNames: '[name].cjs',
        },
      ],
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [
        preserveCssImports(),
        copy({
          hook: 'closeBundle',
          flatten: true,
          targets: [
            // Sass entrypoint and utils
            {
              src: ['src/componentStyles.scss', 'src/scss/**/*.scss'],
              dest: ['dist/scss'],
              transform: (contents) =>
                contents
                  .toString()
                  .replace(/~scss/g, '.')
                  .replace(/\.\.\/fonts/g, '@phillips/seldon/dist/fonts'),
            },
          ],
        }),
        copy({
          hook: 'closeBundle',
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
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
