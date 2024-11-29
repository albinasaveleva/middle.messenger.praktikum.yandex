import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import { inputValidation } from '../../utils/formValidation';
import Router from '../../utils/router';

import Input from '../../components/input/index';
import ButtonAction from '../../components/button-action/index';
import ButtonLink from '../../components/button-link/index';
import Form from '../../components/form/index';
import SignupForm from '../../forms/signup-form/index';
import authController from '../../controllers/auth-controller';
import userController from '../../controllers/user-controller';
import chatController from '../../controllers/chat-controller';

const router = new Router("#app");

const blur = (target: HTMLInputElement) => {
    const formInput = target.closest('.form-input');
    const inputError = formInput?.querySelector('.input-error');

    if (inputValidation(target)) {
      (inputError as HTMLElement).style.opacity = "0";
    } else {
      (inputError as HTMLElement).style.opacity = "1";
    }
}

class SignupPage extends Component {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: 'signup-page',
                id: 'signup-page'
            },
            form: new Form({
                attr: {
                    class: 'form',
                    name: 'signup-form',
                    id: 'signup-form'
                },
                content: new SignupForm({
                    attr: {
                        class: 'form-wrapper'
                    },
                    emailInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "email",
                            type: "text",
                            placeholder: "Почта"
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
                            placeholder: "Логин"
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
                            placeholder: "Имя"
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
                            placeholder: "Фамилия"
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
                            placeholder: "Телефон"
                        },
                        events: {
                            blur: (event: Event) => blur(event.target as HTMLInputElement)
                        }
                    }, 'input'),
                    passwordInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "password",
                            type: "password",
                            placeholder: "Пароль"
                        },
                        events: {
                            blur: (event: Event) => blur(event.target as HTMLInputElement)
                        }
                    }, 'input'),
                    doublePasswordInput: new Input({
                        attr: {
                            class: "input-field",
                            name: "password",
                            type: "password",
                            placeholder: "Пароль"
                        },
                        events: {
                            blur: (event: Event) => blur(event.target as HTMLInputElement)
                        }
                    }, 'input'),
                    buttonAction: new ButtonAction({
                        attr: {
                            class: "button-action",
                            type: "submit",
                            form: 'signup-form'
                        },
                        action: "Зарегистрироваться",
                    }, 'button'),
                    buttonLink: new ButtonLink({
                        attr: {
                            class: "button-link",
                        },
                        action: 'Войти',
                        events: {
                            click: (event: Event) => {
                                event.preventDefault();
                                router.go('/');
                            }
                        }
                    }, 'a')
                }, 'div'),
                events: {
                    submit: async (event: Event) => {
                        event.preventDefault();

                        const inputs = (event.target as HTMLElement).querySelectorAll('input');
                        if ((Array.from(inputs).every(inputValidation))) {
                            const data: {[key: string]: string} = {};
                            inputs.forEach((input) => data[input.name] = input.value);

                            const request = async() => {
                                try {
                                    await authController.signup(data);
                                    await userController.getUser();
                                    await chatController.getChats();

                                    router.go('/messenger');
                                    (event.target as HTMLFormElement).reset();
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
export default SignupPage;
