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
        },
        events: {
        }
      }),
      loginInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "login",
          type: "text",
          placeholder: "Логин",
          value: "ivanivanov",
        },
        events: {
        }
      }),
      firstNameInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "first_name",
          type: "text",
          placeholder: "Имя",
          value: "Иван",
        },
        events: {
        }
      }),
      secondNameInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "second_name",
          type: "text",
          placeholder: "Фамилия",
          value: "Иванов",
        },
        events: {
        }
      }),
      displayNameInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "display_name",
          type: "text",
          placeholder: "Пароль",
          value: "Иван",
        },
        events: {
        }
      }),
      phoneInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "phone",
          type: "text",
          placeholder: "Телефон",
          value: '+7 (999) 999 99 99',
        },
        events: {
        }
      }),
      saveButton: new ButtonAction('button', {
        attr: {
          class: 'button-action',
          type: 'submit',
          form: 'profile-form'
        },
        action: 'Сохранить',
        events: {
          click: (event) => {
            event.preventDefault();
            const formData = new FormData(document.forms['profile-form']);

            for (let pair of formData.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
            }
          }
        }
      })
    })
  }
  render() {
    return this.compile(tpl);
  }
}
