import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from "../avatar/index";
import Input from "../../components/input";
import ButtonAction from "../../components/button-action";
import Form from '../form';
import ChangeProfileInfoForm from '../../forms/change-profile-info-form';
import { inputValidation } from '../../utils/formValidation';
import ProfileInfo from '../profile-info';
import { blur } from '../../pages/profile-page/profile-page';
import userController from '../../controllers/user-controller';

class ChangeProfileInfo extends Component {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: 'profile'
            },
            avatar: new Avatar({
                attr: {
                class: 'avatar'
                }
            }, 'div'),
            name: props.user ? `<span class="name">${props.user.display_name}</span>` : "",
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
                    value: props.user?.email || "",
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
                    value: props.user?.login || "",
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
                    value: props.user?.first_name || "",
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
                    value: props.user?.second_name || "",
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
                    value: props.user?.display_name || "",
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
                    value: props.user?.phone || "",
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
                    submit: async (event: Event) => {
                        event.preventDefault();

                        const inputs = (event.target as HTMLElement).querySelectorAll('input');
                        if (Array.from(inputs).every(inputValidation)) {
                            const data: {[key: string]: string} = {};
                            inputs.forEach((input) => data[input.name] = input.value);

                            const request = async() => {
                                try {
                                    await userController.updateProfile(data);

                                    props.changeProfileContent({
                                        content: new ProfileInfo({
                                            changeProfileContent: props.changeProfileContent
                                        })
                                    });
                                } catch (error) {
                                    console.log(error)
                                }
                            };
                            await request();
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
export default ChangeProfileInfo;
