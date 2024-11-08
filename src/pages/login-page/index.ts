import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import { inputValidation } from '../../utils/formValidation';
import Form from '../../components/form';
import LoginForm from '../../forms/login-form';
import Router from '../../utils/router';
import AuthApi from '../../api/auth-api';

const router = new Router("#app");

const blur = (target: HTMLInputElement) => {
    const formInput = target.closest('.form-input');
    const inputError = formInput?.querySelector('.input-error');

    if (inputValidation(target)) {
      (inputError as HTMLElement).style.opacity = "0";
    } else {
      (inputError as HTMLElement).style.opacity = "1";
    }
}

const auth = new AuthApi();

export default class LoginPage extends Component {
  constructor() {
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
            },
            action: 'Нет аккаунта?',
            events: {
              click: (event: Event) => {
                event.preventDefault();
                router.go('/sign-up');
              }
            }
          }),
        }),
        events: {
            submit: (event: Event) => {
                event.preventDefault();

                const inputs = (event.target as HTMLElement).querySelectorAll('input');

                if ((Array.from(inputs).every(inputValidation))) {
                    const data: {[key: string]: string} = {};
                    inputs.forEach((input) => data[input.name] = input.value)
                    auth.signin(data);

                    (event.target as HTMLFormElement).reset();
                } else {
                    inputs.forEach(blur);
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
