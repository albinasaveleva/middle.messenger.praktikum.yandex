import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../../components/avatar";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";

export default class ChangeProfilePassword extends Component {
  constructor(changePageContent, changeProfileContent) {
    super('div', {
      attr: {
        class: 'profile',
      },
      avatar: new Avatar('div', {
        attr: {
          class: 'avatar'
        }
      }),
      oldPasswordInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "oldPassword",
          type: "password",
          placeholder: "Старый пароль",
          value: "password",
        }
      }),
      newPasswordInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "newPassword",
          type: "password",
          placeholder: "Новый пароль",
          value: "password",
        }
      }),
      doubleNewPasswordInput: new Input('input', {
        attr: {
          class: "input-field", 
          name: "newPassword",
          type: "password",
          placeholder: "Повторите новый пароль",
          value: "password",
        }
      }),
      saveButton: new ButtonAction('button', {
        attr: {
          class: 'button-action',
          type: 'button',
          name: 'profile-form'
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
