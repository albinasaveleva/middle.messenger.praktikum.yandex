import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcss from '@vituum/vite-plugin-postcss';


export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        changeProfileInfoPage: 'src/pages/change-profile-info-page.html',
        changeProfilePasswordPage: 'src/pages/change-profile-password-page.html',
        chatPage: 'src/pages/chat-page.html',
        errorPage: 'src/pages/error-page.html',
        loginPage: 'src/pages/login-page.html',
        nonFoundPage: 'src/pages/non-found-page.html',
        profilePage: 'src/pages/profile-page.html',
        signupPage: 'src/pages/signup-page.html',
      },
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  publicDir: "static",
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
