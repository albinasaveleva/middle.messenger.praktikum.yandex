import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import ButtonLink from '../../components/button-link';

export default class MainPage extends Component {
  constructor() {
    super('div', {
      attr: {
        class: 'main-page',
        id: 'main-page'
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
            const href = event.target.attributes.href.value;
            history.pushState(null, null, href);
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
            const href = event.target.attributes.href.value;
            history.pushState(null, null, href);
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
            const href = event.target.attributes.href.value;
            history.pushState(null, null, href);
          }
        }
      }),
      profilePageLink: new ButtonLink('a', {
        attr: {
          class: 'button-link',
          href: '/profile'
        },
        action: 'Список чатов и лента переписки',
        events: {
          click: (event) => {
            event.preventDefault();
            const href = event.target.attributes.href.value;
            history.pushState(null, null, href);
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
            const href = event.target.attributes.href.value;
            history.pushState(null, null, href);
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
            const href = event.target.attributes.href.value;
            history.pushState(null, null, href);
          }
        }
      }),
    })
  }
  render() {
    return this.compile(tpl);
  }
}

