import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import * as packageJson from './package.json'

const plugins = [
  react(),
  dts(),
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  build: {
    minify: true,
    reportCompressedSize: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: ['src/index.ts'],
      name: 'Seldon',
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      input: 'src/index.ts',
      output: [
        {
          dir: 'dist',
          preserveModulesRoot: 'src',
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js'
        }
      ],
      preserveModules: true,
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [
        copy({
          flatten: false,
          targets: [
            // Sass entrypoint
            { src: 'src/styles.scss', dest: ['dist/scss', 'public/scss'] },

            // Sass components
            {
              src: ['src/components/**/*.scss', 'src/pages/**/*.scss'],
              dest: ['dist/scss', 'public/scss'],
            },
          ],
        }),
        peerDepsExternal()
      ],
    },
  },
})
