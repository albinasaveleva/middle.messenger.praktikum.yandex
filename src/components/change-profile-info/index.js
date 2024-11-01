import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../../components/avatar";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";
import Form from '../form';
import ChangeProfileInfoForm from '../../forms/change-profile-info-form';
import { inputValidation } from '../../utils/formValidation';
import ProfileInfo from '../profile-info';

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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
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
              blur: (event) => {
                console.log(inputValidation(event.target))
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
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
              blur: (event) => {
                if (inputValidation(event.target)) {
                  event.target.previousElementSibling.style.color = "inherit";
                } else {
                  event.target.previousElementSibling.style.color = "red";
                }
              }
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
              form: 'profile-form'
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
