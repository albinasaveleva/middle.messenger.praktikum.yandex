import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ButtonLink from "../button-link/index";
import Input from "../input/index";
import ChangeProfileInfo from '../change-profile-info/index';
import ChangeProfilePassword from '../change-profile-password/index';
import Form from '../form/index';
import ProfileInfoForm from '../../forms/profile-info-form/index';
import Router from '../../utils/router';
import authController from '../../controllers/auth-controller';
import AvatarHover from '../avatar-hover/avatar-hover';

const router = new Router("#app");

class ProfileInfo extends Component {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: 'profile'
            },
            avatar: props.avatar,
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
            name: props.name,
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
                            value: props.user?.email || "",
                            readonly: true
                        }
                    }, 'input'),
                    loginInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "login",
                            type: "text",
                            placeholder: "Логин",
                            value: props.user?.login || "",
                            readonly: true
                        }
                    }, 'input'),
                    firstNameInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "first_name",
                            type: "text",
                            placeholder: "Имя",
                            value: props.user?.first_name || "",
                            readonly: true
                        }
                    }, 'input'),
                    secondNameInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "second_name",
                            type: "text",
                            placeholder: "Фамилия",
                            value: props.user?.second_name || "",
                            readonly: true
                        }
                    }, 'input'),
                    displayNameInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "display_name",
                            type: "text",
                            placeholder: "Имя в чате",
                            value: props.user?.display_name || "",
                            readonly: true
                        }
                    }, 'input'),
                    phoneInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "phone",
                            type: "text",
                            placeholder: "Телефон",
                            value: props.user?.phone || "",
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
                                props.changeProfileContent({
                                    content: new ChangeProfileInfo({
                                        changeProfileContent: props.changeProfileContent
                                    })
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
                                props.changeProfileContent({
                                    content: new ChangeProfilePassword({
                                        changeProfileContent: props.changeProfileContent
                                    })
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
export default ProfileInfo;
