import { defineConfig } from 'vite';
// import handlebars from './vite-plugin-handlebars-precompile';
import handlebars from 'vite-plugin-handlebars';
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
    handlebars(),
    postcss({
      file: {
      dirname: './src/styles',
      basename: 'style.css',
      extname: '.css'
    }
    })
  ],
})
