import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../avatar";
import Input from "../input";
import ButtonAction from "../button-action";
import Form from '../form';
import ChangeProfilePasswordForm from '../../forms/change-profile-password-form';
import { inputValidation } from '../../utils/formValidation';
import ProfileInfo from '../profile-info';

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
              name: "password",
              type: "password",
              placeholder: "Старый пароль",
              value: "Password1",
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
              name: "password",
              type: "password",
              placeholder: "Новый пароль",
              value: "Password1",
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
              name: "password",
              type: "password",
              placeholder: "Повторите новый пароль",
              value: "Password1",
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
              type: 'submit',
              name: 'profile-form'
            },
            action: 'Сохранить',
          })
        }),
        events: {
          submit: (event) => {
            event.preventDefault();

            const inputs = event.target.querySelectorAll('input');
            inputs.forEach(input => {
              if (inputValidation(input)) {
                input.previousElementSibling.style.color = "inherit";
              } else {
                input.previousElementSibling.style.color = "red";
              }
            })

            if ([...inputs].every(inputValidation)) {
                const formData = new FormData(event.target);

                for (let pair of formData.entries()) {
                  console.log(`${pair[0]}: ${pair[1]}`);
                }

                changeProfileContent({
                  content: new ProfileInfo(changePageContent, changeProfileContent)
                })
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
