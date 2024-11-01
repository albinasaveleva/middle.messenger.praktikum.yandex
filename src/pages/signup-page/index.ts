import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import LoginPage from '../login-page';
import { inputValidation } from '../../utils/formValidation';
import Form from '../../components/form';
import SignupForm from '../../forms/signup-form';

export default class SignupPage extends Component {
  disabledSubmit = true;

  constructor(changePageContent) {
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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.nextElementSibling.style.opacity = 0;
                } else {
                  event.target.nextElementSibling.style.opacity = 1;
                }
              }
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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.nextElementSibling.style.opacity = 0;
                } else {
                  event.target.nextElementSibling.style.opacity = 1;
                }
              }
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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.nextElementSibling.style.opacity = 0;
                } else {
                  event.target.nextElementSibling.style.opacity = 1;
                }
              }
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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.nextElementSibling.style.opacity = 0;
                } else {
                  event.target.nextElementSibling.style.opacity = 1;
                }
              }
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
          doublePasswordInput: new Input('input', {
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
              form: 'signup-form'
            },
            action: "Зарегистрироваться",
          }),
          buttonLink: new ButtonLink('a', {
            attr: {
              class: "button-link", 
              href: "/login"
            },
            action: 'Войти',
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
          })
        }),
        events: {
          submit: (event) => {
            event.preventDefault();

            let error = false;

            const inputs = event.target.querySelectorAll('input');
            inputs.forEach(input => {
              if (inputValidation(input)) {
                input.nextElementSibling.style.opacity = 0;
                error = false;
              } else {
                input.nextElementSibling.style.opacity = 1;
                error = true
              }
            })

            if (!error) {
              const formData = new FormData(event.target);

              for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
              }

              event.target.reset();
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
