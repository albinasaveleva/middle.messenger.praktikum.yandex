import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Router from '../../utils/router';
import { inputValidation } from '../../utils/formValidation';
import authController from '../../controllers/auth-controller';

import ButtonAction from '../../components/button-action/index';
import ButtonLink from '../../components/button-link/index';
import Input from '../../components/input/index';
import Form from '../../components/form/index';
import LoginForm from '../../forms/login-form/index';
import userController from '../../controllers/user-controller';
import chatApi from '../../api/chat-api';

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

class LoginPage extends Component {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: 'login-page',
                id: 'login-page'
            },
            form: new Form({
                attr: {
                    class: "form",
                    name: "login-form",
                    id: "login-form"
                },
                content: new LoginForm({
                    attr: {
                        class: 'form-wrapper'
                    },
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
                    buttonAction: new ButtonAction({
                        attr: {
                            class: "button-action",
                            type: "submit",
                            form: 'login-form'
                        },
                        action: "Войти",
                    }, 'button'),
                    buttonLink: new ButtonLink({
                        attr: {
                            class: "button-link",
                        },
                        action: 'Нет аккаунта?',
                        events: {
                            click: (event: Event) => {
                                event.preventDefault();
                                router.go('/sign-up');
                            }
                        }
                    }, 'a'),
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
                                    await authController.signin(data);
                                    await userController.getUser();
                                    await chatApi.getChats();

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
        }, 'div');
    }
    render() {
        return this.compile(tpl);
    }
}
export default LoginPage;
