import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../../components/avatar";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";

export default class ChangeProfileInfo extends Component {
  constructor(changePageContent, changeProfileContent) {
    super('div', {
      attr: {
        class: 'profile'
      },
      avatar: new Avatar('div', {
        attr: {
          class: 'avatar'
        }
      }),
      emailInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "email",
          type: "email",
          placeholder: "Почта",
          value: "pochta@yandex.ru",
        }
      }),
      loginInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "login",
          type: "text",
          placeholder: "Логин",
          value: "ivanivanov",
        }
      }),
      firstNameInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "first_name",
          type: "text",
          placeholder: "Имя",
          value: "Иван",
        }
      }),
      secondNameInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "second_name",
          type: "text",
          placeholder: "Фамилия",
          value: "Иванов",
        }
      }),
      displayNameInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "display_name",
          type: "text",
          placeholder: "Пароль",
          value: "Иван",
        }
      }),
      phoneInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "phone",
          type: "text",
          placeholder: "Телефон",
          value: '+7 (999) 999 99 99',
        }
      }),
      saveButton: new ButtonAction('button', {
        attr: {
          class: 'button-action',
          type: 'button'
        },
        action: 'Сохранить'
      })
    })
  }
  render() {
    return this.compile(tpl);
  }
}
