import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../avatar";
import ButtonLink from "../button-link";
import Input from "../input";
import ChangeProfileInfo from '../change-profile-info';
import ChangeProfilePassword from '../change-profile-password';
import Form from '../form';
import ProfileInfoForm from '../../forms/profile-info-form';
import AvatarHover from '../avatar-hover';
import Router from '../../utils/router';

const router = new Router("#app");

export default class ProfileInfo extends Component {
  constructor(changeProfileContent: any) {
    super('div', {
      attr: {
        class: 'profile'
      },
      avatar: new Avatar('div', {
        attr: {
          class: 'avatar'
        },
        events: {
          mouseover: (event: Event) => {
            const avatarWrapper = (event.target as HTMLElement).closest('.avatar-wrapper');
            const avatarHover = (avatarWrapper as HTMLElement).querySelector('.avatar-hover');
            (avatarHover as HTMLElement).style.display = "flex";
          },
          mouseout: (event: Event) => {
            const avatarWrapper = (event.target as HTMLElement).closest('.avatar-wrapper');
            const avatarHover = (avatarWrapper as HTMLElement).querySelector('.avatar-hover');
            (avatarHover as HTMLElement).style.display = "none";
          },
          click: () => {
            const avatarModal = document.querySelector('#avatar-modal') as HTMLElement;
            avatarModal.style.display = 'flex';
          }
        }
      }),
      avatarHover: new AvatarHover('div', {
        attr: {
          class: 'avatar-hover'
        },
        events: {
          click: () => {
            const avatarModal = document.querySelector('#avatar-modal') as HTMLElement;
            avatarModal.style.display = 'flex';
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
              placeholder: "Имя в чате",
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
              click: (event: Event) => {
                event.preventDefault();
                changeProfileContent({
                  content: new ChangeProfileInfo(changeProfileContent)
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
              click: (event: Event) => {
                event.preventDefault();
                changeProfileContent({
                  content: new ChangeProfilePassword(changeProfileContent)
                })
              }
            }
          }),
          logoutButton: new ButtonLink('a', {
            attr: {
              class: "button-link",
            },
            action: 'Выйти',
            events: {
              click: (event: Event) => {
                event.preventDefault();
                router.go('/');
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
