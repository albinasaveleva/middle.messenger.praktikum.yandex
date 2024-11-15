import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../../components/avatar";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";
import Form from '../form';
import ChangeProfileInfoForm from '../../forms/change-profile-info-form';
import { inputValidation } from '../../utils/formValidation';
import ProfileInfo from '../profile-info';
import { blur } from '../../pages/profile-page';
import connect from '../../utils/connect';

class ChangeProfileInfo extends Component {
  constructor(changeProfileContent: any) {
    super({
      attr: {
        class: 'profile'
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
        content: new ChangeProfileInfoForm({
          attr: {
            class: 'form-wrapper',
          },
          emailInput: new Input({
            attr: {
              class: "input-field",
              name: "email",
              type: "text",
              placeholder: "Почта",
              value: "pochta@yandex.ru",
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }, 'input'),
          loginInput: new Input({
            attr: {
              class: "input-field",
              name: "login",
              type: "text",
              placeholder: "Логин",
              value: "ivanivanov",
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }, 'input'),
          firstNameInput: new Input({
            attr: {
              class: "input-field",
              name: "first_name",
              type: "text",
              placeholder: "Имя",
              value: "Иван",
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }, 'input'),
          secondNameInput: new Input({
            attr: {
              class: "input-field",
              name: "second_name",
              type: "text",
              placeholder: "Фамилия",
              value: "Иванов",
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }, 'input'),
          displayNameInput: new Input({
            attr: {
              class: "input-field",
              name: "display_name",
              type: "text",
              placeholder: "Имя в чате",
              value: "Иван",
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }, 'input'),
          phoneInput: new Input({
            attr: {
              class: "input-field",
              name: "phone",
              type: "text",
              placeholder: "Телефон",
              value: '+79999999999',
            },
            events: {
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }, 'input'),
          saveButton: new ButtonAction({
            attr: {
              class: 'button-action',
              type: 'submit',
              form: 'profile-form'
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
export default connect(ChangeProfileInfo);
