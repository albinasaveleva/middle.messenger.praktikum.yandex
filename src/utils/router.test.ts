import { expect, use } from "chai";
import Router from "./router";
import Component from "./component";

describe ('Router', () => {
    // it('Переход на новую страницу должен менять состояние сущности history', () => {
    //     window.history.pushState({page: 'login'}, 'Login', '/login');
    //     window.history.pushState({page: 'register'}, 'Register', '/register');

    //     expect(window.history.length).to.eq(3);
    //   });
    const router = new Router("#app");

    class LoginPage extends Component {
        render() {
            return this.compile("<div>LoginPage</div>");
        }
    }
    class SignupPage extends Component {
        render() {
            return this.compile("<div>SignupPage</div>");
        }
    }
    class ChatPage extends Component {
        render() {
            return this.compile("<div>ChatPage</div>");
        }
    }
    class ProfilePage extends Component {
        render() {
            return this.compile("<div>ProfilePage</div>");
        }
    }

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
