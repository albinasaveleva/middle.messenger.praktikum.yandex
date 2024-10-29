import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import ButtonLink from '../../components/button-link';

import LoginPage from '../login-page';
import NonFoundPage from '../non-found-page';
import ErrorPage from '../error-page';
import ChatPage from '../chat-page';
import SignupPage from '../signup-page';
import ProfilePage from '../profile-page';

export default class StartPage extends Component {
  constructor(changePageContent) {
    super('div', {
      attr: {
        class: 'start-page',
        id: 'start-page'
      },
      loginPageLink: new ButtonLink('a', {
        attr: {
          class: 'button-link',
          href: '/login'
        },
        action: 'Авторизация',
        events: {
          click: (event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new LoginPage(changePageContent)
            });
          }
        }
      }),
      signupPageLink: new ButtonLink('a', {
        attr: {
          class: 'button-link',
          href: '/signup'
        },
        action: 'Регистрация',
        events: {
          click: (event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new SignupPage(changePageContent)
            });
          }
        }
      }),
      chatPageLink: new ButtonLink('a', {
        attr: {
          class: 'button-link',
          href: '/chats'
        },
        action: 'Список чатов и лента переписки',
        events: {
          click: (event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new ChatPage(changePageContent)
            });
          }
        }
      }),
      profilePageLink: new ButtonLink('a', {
        attr: {
          class: 'button-link',
          href: '/profile'
        },
        action: 'Профиль пользователя',
        events: {
          click: (event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new ProfilePage(changePageContent)
            });
          }
        }
      }),
      nonFoundPageLink: new ButtonLink('a', {
        attr: {
          class: 'button-link',
          href: '/non-found'
        },
        action: 'Страница 404',
        events: {
          click: (event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new NonFoundPage(changePageContent)
            });
          }
        }
      }),
      errorPageLink: new ButtonLink('a', {
        attr: {
          class: 'button-link',
          href: '/error'
        },
        action: 'Страница 5**',
        events: {
          click: (event) => {
            event.preventDefault();
            // const href = event.target.attributes.href.value;
            // history.pushState(null, null, href);
            changePageContent({
              content: new ErrorPage(changePageContent)
            });
          }
        }
      }),
    })
  }
  render() {
    return this.compile(tpl);
  }
}

