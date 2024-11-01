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

export default class ChangeProfileInfo extends Component {
  constructor(changePageContent: any, changeProfileContent: any) {
    super('div', {
      attr: {
        class: 'profile'
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
        content: new ChangeProfileInfoForm('div', {
          attr: {
            class: 'form-wrapper',
          },
          emailInput: new Input('input', {
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
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
              blur: (event: Event) => blur(event.target as HTMLInputElement)
            }
          }),
          displayNameInput: new Input('input', {
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
          }),
          phoneInput: new Input('input', {
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
          }),
          saveButton: new ButtonAction('button', {
            attr: {
              class: 'button-action',
              type: 'submit',
              form: 'profile-form'
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
