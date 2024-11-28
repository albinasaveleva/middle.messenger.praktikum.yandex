import chatController from './src/controllers/chat-controller';
import userController from './src/controllers/user-controller';
import { ChatPage, LoginPage, ProfilePage, SignupPage } from './src/pages/index';
import store from './src/store';
import Router from './src/utils/router';

const router = new Router("#app");
router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/messenger', ChatPage)
    .use('/settings', ProfilePage)

let user = null;

userController.getUser()
    .then(response => {
        const user = response;
        chatController.getChats();
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

    })
