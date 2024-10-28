import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import ButtonAction from '../../components/button-action';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';

export default class LoginPage extends Component {
  constructor() {
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
        action: 'Нет аккаунта?'
      })
    });
  }
  render() {
    return this.compile(tpl);
  }
}
