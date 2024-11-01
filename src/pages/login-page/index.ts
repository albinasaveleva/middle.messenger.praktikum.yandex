import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import SignupPage from '../signup-page';
import { inputValidation } from '../../utils/formValidation';
import Form from '../../components/form';
import LoginForm from '../../forms/login-form';

const blur = (target: HTMLInputElement) => {
    const formInput = target.closest('.form-input');
    const inputError = formInput?.querySelector('.input-error');

    if (inputValidation(target)) {
      (inputError as HTMLElement).style.opacity = "0";
    } else {
      (inputError as HTMLElement).style.opacity = "1";
    }
}

export default class LoginPage extends Component {
  constructor(changePageContent: any) {
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
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
              click: (event: Event) => {
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
            submit: (event: Event) => {
                event.preventDefault();

                const inputs = (event.target as HTMLElement).querySelectorAll('input');
                inputs.forEach(blur)

                if ((Array.from(inputs).every(inputValidation))) {
                  const formData = new FormData(event.target as HTMLFormElement);

                  for (let pair of formData.entries()) {
                    console.log(`${pair[0]}: ${pair[1]}`);
                  }

                  (event.target as HTMLFormElement).reset();
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