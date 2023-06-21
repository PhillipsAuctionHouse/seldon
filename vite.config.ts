import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy';
import peerDepsExternal from "rollup-plugin-peer-deps-external";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: ['src/index.ts'],
      name: 'Seldon',
      formats: ['es', 'umd'],
      // the proper extensions will be added
      fileName: 'seldon',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react, react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
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
