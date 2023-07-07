import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import * as packageJson from './package.json'

const plugins = [
  react(),
  dts({entryRoot: 'src'}),
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  build: {
    minify: true,
    reportCompressedSize: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: ['index.ts'],
      name: 'seldon',
      formats: ['es'],
    },

    rollupOptions: {
      input: 'src/index.ts',
      output:
        {
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: 'src',
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js'
        }
      ,

      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [
        copy({
          hook: 'writeBundle',
          flatten: false,
          targets: [
            // Sass entrypoint
            { src: 'src/styles.scss', dest: ['dist/scss'] },

            // Sass components
            {
              src: ['src/components/**/*.scss', 'src/pages/**/*.scss', 'src/utils/**/*.scss'],
              dest: ['dist/scss'],
            },
          ],
        }),
        peerDepsExternal()
      ],
    },
  },
})
