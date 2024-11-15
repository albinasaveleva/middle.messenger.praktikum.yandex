import userController from './src/controllers/user-controller';
import { ChatPage, LoginPage, NonFoundPage, ProfilePage, SignupPage } from './src/pages/index';
import store from './src/store';
import Router from './src/utils/router';

const init = async() => {
    try {
        await userController.getUser();
    } catch ({reason}) {
        console.log(reason)
    }
};

await init();

const router = new Router("#app");
const {user} = store.getState();

router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/messenger', ChatPage)
    .use('/settings', ProfilePage)
    .start();


if(user === null) {
    if (window.location.pathname === '/sign-up') {
        router.go('/sign-up');
    } else {
        router.go('/');
    }
} else {
    if (window.location.pathname === '/settings') {
        router.go('/settings');
    } else {
        router.go('/messenger');
    }
}
