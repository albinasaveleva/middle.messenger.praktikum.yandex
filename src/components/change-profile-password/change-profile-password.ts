import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../avatar/avatar";
import Input from "../input";
import ButtonAction from "../button-action";
import Form from '../form';
import ChangeProfilePasswordForm from '../../forms/change-profile-password-form';
import { inputValidation } from '../../utils/formValidation';
import ProfileInfo from '../profile-info';
import { blur } from '../../pages/profile-page/profile-page';
import userController from '../../controllers/user-controller';

class ChangeProfilePassword extends Component {
    constructor(props: any) {
        super({
            ...props,
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
                    value: "",
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
                    value: "",
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
                    value: "",
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
                        if (Array.from(inputs).every(inputValidation)) {
                            const data: {[key: string]: string} = {
                                oldPassword: inputs[0].value,
                                newPassword: inputs[1].value
                            };

                            userController.updatePassword(data);

                            props.changeProfileContent({
                                content: new ProfileInfo({
                                    changeProfileContent: props.changeProfileContent
                                })
                            })

                        } else {
                            inputs.forEach(blur);
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
export default ChangeProfilePassword;
