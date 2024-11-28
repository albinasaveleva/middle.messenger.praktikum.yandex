import chatController from './src/controllers/chat-controller';
import userController from './src/controllers/user-controller';
import { ChatPage, LoginPage, NonFoundPage, ProfilePage, SignupPage } from './src/pages/index';
import store from './src/store';
import Router from './src/utils/router';

const router = new Router("#app");
router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/messenger', ChatPage)
    .use('/settings', ProfilePage)

try {
    await userController.getUser();
    await chatController.getChats();
} catch ({reason}) {
    console.log(reason)
} finally {
    setInterval(() => {chatController.getChats()}, 15000);

    const {user} = store.getState();

    router.start();

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
}
