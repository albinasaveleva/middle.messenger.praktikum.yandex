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
    userController.getUser();
    let state = store.getState();

    super({
        attr: {
            class: 'profile'
        },
        avatar: new Avatar({
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
        }, 'div'),
        avatarHover: new AvatarHover({
            attr: {
                class: 'avatar-hover'
            },
            events: {
                click: () => {
                    const avatarModal = document.querySelector('#avatar-modal') as HTMLElement;
                    avatarModal.style.display = 'flex';
                }
            }
        }, 'div'),
        form: new Form({
            attr: {
                class: 'form',
                name: "profile-form",
                id: "profile-form"
            },
            content: new ProfileInfoForm({
                attr: {
                    class: 'form-wrapper',
                },
                emailInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "email",
                        type: "email",
                        placeholder: "Почта",
                        value: state.user?.email || "",
                        readonly: true
                    }
                }, 'input'),
                loginInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "login",
                        type: "text",
                        placeholder: "Логин",
                        value: state.user?.login || "",
                        readonly: true
                    }
                }, 'input'),
                firstNameInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "first_name",
                        type: "text",
                        placeholder: "Имя",
                        value: state.user?.first_name || "",
                        readonly: true
                    }
                }, 'input'),
                secondNameInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "second_name",
                        type: "text",
                        placeholder: "Фамилия",
                        value: state.user?.second_name || "",
                        readonly: true
                    }
                }, 'input'),
                displayNameInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "display_name",
                        type: "text",
                        placeholder: "Имя в чате",
                        value: state.user?.display_name || "",
                        readonly: true
                    }
                }, 'input'),
                phoneInput: new Input({
                    attr: {
                        class: "input-field",
                        name: "phone",
                        type: "text",
                        placeholder: "Телефон",
                        value: state.user?.phone || "",
                        readonly: true
                    }
                }, 'input'),
                changeInfoButton: new ButtonLink({
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
                }, 'a'),
                changePasswordButton: new ButtonLink({
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
                }, 'a'),
                logoutButton: new ButtonLink({
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
                }, 'a')
            }, 'div')
        }, 'form'),

    }, 'div')

  }
  render() {
    return this.compile(tpl);
  }
}
export default connect(ProfileInfo);
