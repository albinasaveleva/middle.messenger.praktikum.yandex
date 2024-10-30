import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import SignupPage from '../signup-page';
import { inputValidation } from '../../utils/formValidation';

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
        },
        events: {
          blur: (event) => {
            inputValidation(event.target)
          }
        }
      }),
      passwordInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "password",
          type: "password",
          placeholder: "Пароль"
        },
        events: {
          blur: (event) => {
            inputValidation(event.target)
          }
        }
      }),
      buttonAction: new ButtonAction('button', {
        attr: {
          class: "button-action",
          type: "submit",
          form: 'login-form'
        },
        action: "Войти",
        events: {
          click: (event) => {
            event.preventDefault();
            const formData = new FormData(document.forms['login-form']);

            for (let pair of formData.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
            }

            document.querySelector('#login-form').reset();
          }
        }
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
      }),
      onSubmit: (event) => {
        event.preventDefault();
        console.log(event);
      }
    });
  }
  render() {
    return this.compile(tpl);
  }
}
