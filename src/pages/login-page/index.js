import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import SignupPage from '../signup-page';

export default class LoginPage extends Component {
  constructor(changePageContent) {
    super('div',
    {
      attr: {
        class: 'login-page',
        id: 'login-page'
      },
      loginInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "login",
          type: "text",
          placeholder: "Логин"
        }
      }),
      passwordInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "password",
          type: "password",
          placeholder: "Пароль"
        }
      }),
      buttonAction: new ButtonAction('button', {
        attr: {
          class: "button-action",
          type: "submit"
        },
        action: "Войти"
      }),
      buttonLink: new ButtonLink('a', {
        attr: {
          class: "button-link", 
          href: "/signup"
        },
        action: 'Нет аккаунта?',
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
      })
    });
  }
  render() {
    return this.compile(tpl);
  }
}
