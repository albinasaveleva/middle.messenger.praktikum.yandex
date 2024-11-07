// import App from "./src/app";

// const app = new App();
// app.render();

import { ChatPage, LoginPage, ProfilePage, SignupPage } from './src/pages/index';
import Router from './src/utils/router';

const loginPage = new LoginPage();
const signUpPage = new SignupPage();
const chatPage = new ChatPage();
const profilePage = new ProfilePage();

const router = new Router("#app");
router
    .use('/', loginPage)
    .use('/sign-up', signUpPage)
    .use('/messenger', chatPage)
    .use('/settings', profilePage)
    .start();
