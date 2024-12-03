import { expect } from "chai";
import Component from "./component";

export class LoginPage extends Component {
    constructor() {
        super({
          attr: {
            class: 'login-page'
          },
          content: 'LoginPage'
        }, 'div')
    }
    render() {
        return this.compile(`<span>{{{content}}}</span>`);
    }
}
export class SignupPage extends Component {
    constructor() {
        super({
          attr: {
            class: 'signup-page'
          },
          content: 'SignupPage'
        }, 'div')
    }
    render() {
        return this.compile(`<span>{{{content}}}</span>`);
    }
}
export class ChatPage extends Component {
    constructor() {
        super({
          attr: {
            class: 'chat-page'
          },
          content: 'ChatPage'
        }, 'div')
    }
    render() {
        return this.compile(`<span>{{{content}}}</span>`);
    }
}
export class ProfilePage extends Component {
    constructor() {
        super({
          attr: {
            class: 'profile-page'
          },
          content: 'ProfilePage'
        }, 'div')
    }
    render() {
        return this.compile(`<span>{{{content}}}</span>`);
    }
}

describe("Component", () => {
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const chatPage = new ChatPage();
    const profilePage = new ProfilePage();


    it("should have current content", () => {
        expect(loginPage.getContent()?.innerHTML, "<span>LoginPage</span>");
        expect(signupPage.getContent()?.innerHTML, "<span>SignupPage</span>");
        expect(chatPage.getContent()?.innerHTML, "<span>ChatPage</span>");
        expect(profilePage.getContent()?.innerHTML, "<span>ProfilePage</span>");
    });

    it("should have current className", () => {
        expect(loginPage.getContent()?.className, "login-page");
        expect(signupPage.getContent()?.className, "signup-page");
        expect(chatPage.getContent()?.className, "chat-page");
        expect(profilePage.getContent()?.className, "profile-page");
    });

    it("should have current nodeName", () => {
        expect(loginPage.getContent()?.nodeName.toLowerCase(), "div");
        expect(signupPage.getContent()?.nodeName.toLowerCase(), "div");
        expect(chatPage.getContent()?.nodeName.toLowerCase(), "div");
        expect(profilePage.getContent()?.nodeName.toLowerCase(), "div");
    });

    it("should have new props after setProps", () => {
        loginPage.setProps({content: 'New LoginPage'});
        signupPage.setProps({content: 'New SignupPage'});
        chatPage.setProps({content: 'New ChatPage'});
        profilePage.setProps({content: 'New ProfilePage'});

        expect(loginPage.getContent()?.innerHTML, "<span>New LoginPage</span>");
        expect(signupPage.getContent()?.innerHTML, "<span>New SignupPage</span>");
        expect(chatPage.getContent()?.innerHTML, "<span>New ChatPage</span>");
        expect(profilePage.getContent()?.innerHTML, "<span>New ProfilePage</span>");
    });
});
