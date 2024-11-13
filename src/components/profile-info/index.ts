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
import store, { StoreEvents } from '../../store';
import userController from '../../controllers/user-controller';
import authController from '../../controllers/auth-controller';
import connect from '../../utils/connect';

const router = new Router("#app");

class ProfileInfo extends Component {
  constructor(changeProfileContent: any) {
    let state = store.getState();
    userController.getUser();

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
                        value: state.user?.email || "",
                        readonly: true
                    }
                }),
                loginInput: new Input('input', {
                    attr: {
                        class: "input-field",
                        name: "login",
                        type: "text",
                        placeholder: "Логин",
                        value: state.user?.login || "",
                        readonly: true
                    }
                }),
                firstNameInput: new Input('input', {
                    attr: {
                        class: "input-field",
                        name: "first_name",
                        type: "text",
                        placeholder: "Имя",
                        value: state.user?.first_name || "",
                        readonly: true
                    }
                }),
                secondNameInput: new Input('input', {
                    attr: {
                        class: "input-field",
                        name: "second_name",
                        type: "text",
                        placeholder: "Фамилия",
                        value: state.user?.second_name || "",
                        readonly: true
                    }
                }),
                displayNameInput: new Input('input', {
                    attr: {
                        class: "input-field",
                        name: "display_name",
                        type: "text",
                        placeholder: "Имя в чате",
                        value: state.user?.display_name || "",
                        readonly: true
                    }
                }),
                phoneInput: new Input('input', {
                    attr: {
                        class: "input-field",
                        name: "phone",
                        type: "text",
                        placeholder: "Телефон",
                        value: state.user?.phone || "",
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

                            authController.logout();
                            router.go('/');
                        }
                    }
                })
            })
        }),

    })

  }
  render() {
    const user = this._props.user;

    return this.compile(tpl);
  }
}
export default connect(ProfileInfo);
