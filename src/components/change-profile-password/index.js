import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../../components/avatar";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";
import Form from '../form';
import ChangeProfilePasswordForm from '../../forms/change-profile-password-form';
import { inputValidation } from '../../utils/formValidation';

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
      form: new Form('form', {
        attr: {
          class: 'form',
          name: "profile-form",
          id: "profile-form"
        },
        content: new ChangeProfilePasswordForm('div', {
          attr: {
            class: 'form-wrapper',
          },
          oldPasswordInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "oldPassword",
              type: "password",
              placeholder: "Старый пароль",
              value: "password",
            },
            events: {
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
            }
          }),
          newPasswordInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "newPassword",
              type: "password",
              placeholder: "Новый пароль",
              value: "password",
            },
            events: {
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
            }
          }),
          doubleNewPasswordInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "newPassword",
              type: "password",
              placeholder: "Повторите новый пароль",
              value: "password",
            },
            events: {
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
            }
          }),
          saveButton: new ButtonAction('button', {
            attr: {
              class: 'button-action',
              type: 'button',
              name: 'profile-form'
            },
            action: 'Сохранить',
          })
        }),
        events: {
          submit: (event) => {
            event.preventDefault();

            let error = false;

            const inputs = event.target.querySelectorAll('input');
            inputs.forEach(input => {
              if (inputValidation(input)) {
                input.previousElementSibling.style.color = "inherit";
                error = false;
              } else {
                input.previousElementSibling.style.color = "red";
                error = true
              }
            })

            if (!error) {
              const formData = new FormData(event.target);

              for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
              }
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
