import { defineConfig } from 'vite';
import postcss from '@vituum/vite-plugin-postcss';


export default defineConfig({
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  publicDir: "static",
  plugins: [
    postcss({
      file: {
      dirname: './src/styles',
      basename: 'style.css',
      extname: '.css'
    }
    })
  ],
})
