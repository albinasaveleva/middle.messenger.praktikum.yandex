import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import { inputValidation } from '../../utils/formValidation';
import Form from '../../components/form';
import SignupForm from '../../forms/signup-form';
import Router from '../../utils/router';

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

export default class SignupPage extends Component {
  disabledSubmit = true;

  constructor() {
    super('div', {
      attr: {
        class: 'signup-page',
        id: 'signup-page'
      },
      form: new Form('form', {
        attr: {
          class: 'form',
          name: 'signup-form',
          id: 'signup-form'
        },
        content: new SignupForm('div', {
          attr: {
            class: 'form-wrapper'
          },
          emailInput: new Input('input', {
            attr: {
              class: "input-field",
              name: "email",
              type: "text",
              placeholder: "Почта"
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }),
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
          firstNameInput: new Input('input', {
            attr: {
              class: "input-field",
              name: "first_name",
              type: "text",
              placeholder: "Имя"
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }),
          secondNameInput: new Input('input', {
            attr: {
              class: "input-field",
              name: "second_name",
              type: "text",
              placeholder: "Фамилия"
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }),
          phoneInput: new Input('input', {
            attr: {
              class: "input-field",
              name: "phone",
              type: "text",
              placeholder: "Телефон"
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
          doublePasswordInput: new Input('input', {
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
              form: 'signup-form'
            },
            action: "Зарегистрироваться",
          }),
          buttonLink: new ButtonLink('a', {
            attr: {
              class: "button-link",
            },
            action: 'Войти',
            events: {
              click: (event: Event) => {
                event.preventDefault();
                router.go('/');
              }
            }
          })
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


    })
  }
  render() {
    return this.compile(tpl);
  }
}
