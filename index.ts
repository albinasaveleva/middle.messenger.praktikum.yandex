import userController from './src/controllers/user-controller';
import { ChatPage, LoginPage, NonFoundPage, ProfilePage, SignupPage } from './src/pages/index';
import Router from './src/utils/router';

const init = async() => {
    try {
        await userController.getUser();
    } catch ({reason}) {
        if (reason === 'Cookie is not valid')
        console.log(reason)
    }
};

await init();

const router = new Router("#app");
router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/messenger', ChatPage)
    .use('/settings', ProfilePage)

router
    .start();
