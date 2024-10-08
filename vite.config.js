import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcss from '@vituum/vite-plugin-postcss';


export default defineConfig({
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      partialDirectory: 'src/partials',
    }),
    postcss({
      file: {
      dirname: './src/styles',
      basename: 'style.css',
      extname: '.css'
    }
    })
  ],
})