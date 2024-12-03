import { expect } from "chai";
import Router from "./router";
import { LoginPage, SignupPage, ChatPage, ProfilePage } from "./component.test";

describe ('Router', () => {
    const router = new Router("#app");

    before(() => {
        router
            .use('/', LoginPage)
            .use('/sign-up', SignupPage)
            .use('/messenger', ChatPage)
            .use('/settings', ProfilePage)
            .start();
    })

    it('should be a singleton', () => {
        const router1 = new Router('#app');
        const router2 = new Router('#app');
        expect(router1).to.equal(router2);
    });

    it('should change history', () => {
        window.history.pushState({page: 'login'}, 'LoginPage', '/');
        window.history.pushState({page: 'register'}, 'SignupPage', '/sign-up');
        window.history.pushState({page: 'messenger'}, 'ChatPage', '/messenger');
        window.history.pushState({page: 'settings'}, 'ProfilePage', '/settings');

        expect(window.history.length).to.eq(5);
    });
})
