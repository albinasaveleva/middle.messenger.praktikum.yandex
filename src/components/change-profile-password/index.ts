import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../avatar";
import Input from "../input";
import ButtonAction from "../button-action";
import Form from '../form';
import ChangeProfilePasswordForm from '../../forms/change-profile-password-form';
import { inputValidation } from '../../utils/formValidation';
import ProfileInfo from '../profile-info';
import { blur } from '../../pages/profile-page';

export default class ChangeProfilePassword extends Component {
  constructor(changeProfileContent: any) {
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
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
            submit: (event: Event) => {
                event.preventDefault();

                const inputs = (event.target as HTMLElement).querySelectorAll('input');
                inputs.forEach(blur)

                if (Array.from(inputs).every(inputValidation)) {
                  const formData = new FormData(event.target as HTMLFormElement);

                  for (let pair of formData.entries()) {
                    console.log(`${pair[0]}: ${pair[1]}`);
                  }

                  changeProfileContent({
                    content: new ProfileInfo(changeProfileContent)
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
