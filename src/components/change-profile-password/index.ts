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
import connect from '../../utils/connect';

class ChangeProfilePassword extends Component {
  constructor(changeProfileContent: any) {
    super({
      attr: {
        class: 'profile',
      },
      avatar: new Avatar({
        attr: {
          class: 'avatar'
        }
      }, 'div'),
      form: new Form({
        attr: {
          class: 'form',
          name: "profile-form",
          id: "profile-form"
        },
        content: new ChangeProfilePasswordForm({
          attr: {
            class: 'form-wrapper',
          },
          oldPasswordInput: new Input({
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
          }, 'input'),
          newPasswordInput: new Input({
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
          }, 'input'),
          doubleNewPasswordInput: new Input({
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
          }, 'input'),
          saveButton: new ButtonAction({
            attr: {
              class: 'button-action',
              type: 'submit',
              name: 'profile-form'
            },
            action: 'Сохранить',
          }, 'button')
        }, 'div'),
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
      }, 'form'),
    }, 'div')
  }
  render() {
    return this.compile(tpl);
  }
}
export default  connect(ChangeProfilePassword);
