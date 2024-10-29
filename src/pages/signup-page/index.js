import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Input from '../../components/input';
import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import LoginPage from '../login-page';

export default class SignupPage extends Component {
  constructor(changePageContent) {
    super('div', {
      attr: {
        class: 'signup-page',
        id: 'signup-page'
      },
      emailInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "email",
          type: "email",
          placeholder: "Почта"
        },
        events: {
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
        }
      }),
      doublePasswordInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "password",
          type: "password",
          placeholder: "Пароль"
        },
      }),
      buttonAction: new ButtonAction('button', {
        attr: {
          class: "button-action",
          type: "submit",
          form: 'signup-form'
        },
        action: "Зарегистрироваться",
        events: {
          click: (event) => {
            event.preventDefault();
            const formData = new FormData(document.forms['signup-form']);

            for (let pair of formData.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
            }

            document.querySelector('#signup-form').reset();
          }
        }
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
    })
  }
  render() {
    return this.compile(tpl);
  }
}
