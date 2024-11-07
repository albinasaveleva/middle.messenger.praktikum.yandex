import { ChatPage, LoginPage, ProfilePage, SignupPage } from './src/pages/index';
import Router from './src/utils/router';

const router = new Router("#app");
router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/messenger', ChatPage)
    .use('/settings', ProfilePage)
    .start();
