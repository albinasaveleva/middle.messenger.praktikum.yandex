import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import SignupPage from '../signup-page';
import { inputValidation } from '../../utils/formValidation';
import Form from '../../components/form';
import LoginForm from '../../forms/login-form';

export default class LoginPage extends Component {
  constructor(changePageContent) {
    super('div',
    {
      attr: {
        class: 'login-page',
        id: 'login-page'
      },
      form: new Form('form', {
        attr: {
          class: "form",
          name: "login-form",
          id: "login-form"
        },
        content: new LoginForm('div', {
          attr: {
            class: 'form-wrapper'
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
                if (inputValidation(event.target)) {
                  event.target.nextElementSibling.style.opacity = 0;
                } else {
                  event.target.nextElementSibling.style.opacity = 1;
                }
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
                if (inputValidation(event.target)) {
                  event.target.nextElementSibling.style.opacity = 0;
                } else {
                  event.target.nextElementSibling.style.opacity = 1;
                }
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
        }),
        events: {
          submit: (event) => {
            event.preventDefault();

            const inputs = event.target.querySelectorAll('input');
            inputs.forEach(input => {
              if (inputValidation(input)) {
                input.nextElementSibling.style.opacity = 0;
              } else {
                input.nextElementSibling.style.opacity = 1;
              }
            })

            if (([...inputs].every(inputValidation))) {
              const formData = new FormData(event.target);

              for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
              }

              event.target.reset();
            }
          }
        }
      }),
    });
  }
  render() {
    return this.compile(tpl);
  }
}
