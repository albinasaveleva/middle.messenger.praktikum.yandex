import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../../components/avatar";
import ButtonLink from "../../components/button-link";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";
import LoginPage from '../../pages/login-page/index';
import ChangeProfileInfo from '../change-profile-info';
import ChangeProfilePassword from '../change-profile-password';
import Form from '../form';
import ProfileInfoForm from '../../forms/profile-info-form';

export default class ProfileInfo extends Component {
  constructor(changePageContent, changeProfileContent) {
    super('div', {
      attr: {
        class: 'profile'
      },
      avatar: new Avatar('div', {
        attr: {
          class: 'avatar'
        },
        events: {
          mouseover: (event) => {
            const avatarWrapper = event.target.parentElement;
            const avatarHover = avatarWrapper.querySelector('.avatar-hover');
            avatarHover.style.display = "flex";
          },
          mouseout: (event) => {
            const avatarWrapper = event.target.parentElement;
            const avatarHover = avatarWrapper.querySelector('.avatar-hover');
            avatarHover.style.display = "none";
          },
          click: (event) => {
            console.log(event.target)
          }
        }
      }),
      form: new Form('form', {
        attr: {
          class: 'form',
          name: "profile-form",
          id: "profile-form"
        },
        content: new ProfileInfoForm('div', {
          attr: {
            class: 'form-wrapper',
          },
          emailInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "email",
              type: "email",
              placeholder: "Почта",
              value: "pochta@yandex.ru",
              readonly: true
            }
          }),
          loginInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "login",
              type: "text",
              placeholder: "Логин",
              value: "ivanivanov",
              readonly: true
            }
          }),
          firstNameInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "first_name",
              type: "text",
              placeholder: "Имя",
              value: "Иван",
              readonly: true
            }
          }),
          secondNameInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "second_name",
              type: "text",
              placeholder: "Фамилия",
              value: "Иванов",
              readonly: true
            }
          }),
          displayNameInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "display_name",
              type: "text",
              placeholder: "Пароль",
              value: "Иван",
              readonly: true
            }
          }),
          phoneInput: new Input('input', {
            attr: {
              class: "input-field", 
              name: "phone",
              type: "text",
              placeholder: "Телефон",
              value: '+7 (999) 999 99 99',
              readonly: true
            }
          }),
          changeInfoButton: new ButtonLink('a', {
            attr: {
              class: "button-link", 
              href: "/profile/changeInfo"
            },
            action: 'Изменить данные',
            events: {
              click: (event) => {
                event.preventDefault();
                // const href = event.target.attributes.href.value;
                // history.pushState(null, null, href);
                changeProfileContent({
                  content: new ChangeProfileInfo()
                })
              }
            }
          }),
          changePasswordButton: new ButtonLink('a', {
            attr: {
              class: "button-link", 
              href: "/profile/changePassword"
            },
            action: 'Изменить пароль',
            events: {
              click: (event) => {
                event.preventDefault();
                // const href = event.target.attributes.href.value;
                // history.pushState(null, null, href);
                changeProfileContent({
                  content: new ChangeProfilePassword()
                })
              }
            }
          }),
          logoutButton: new ButtonLink('a', {
            attr: {
              class: "button-link", 
              href: "/login"
            },
            action: 'Выйти',
            events: {
              click: (event) => {
                event.preventDefault();
                // const href = event.target.attributes.href.value;
                // history.pushState(null, null, href);
                changePageContent({
                  content: new LoginPage(changePageContent)
                });
              }
            }
          })
        })
      }),

    })
  }
  render() {
    return this.compile(tpl);
  }
}
