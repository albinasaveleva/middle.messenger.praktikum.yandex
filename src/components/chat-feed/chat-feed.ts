import tpl from './tpl.tmpl';
import Component from '../../utils/component';
import Actions from '../actions/index';
import Frame from '../frame/index';
import ButtonAction from '../button-action/index';
import Form from '../form/index';
import MessageForm from '../../forms/message-form/index';
import Attach from '../attach/index';
import Input from '../input/index';
import { inputValidation } from '../../utils/formValidation';
import messageController from '../../controllers/message-controller';
import Message from '../message/message';

class ChatFeed extends Component {
    constructor(props?: any) {
        super({
            ...props,
            attr: {
                class: 'chat-feed'
            },
            title: props.currentChat.title || '',
            actions: new Actions({
                attr: {
                    class: 'actions'
                },
                events: {
                    click: (event: Event) => {
                        const topBarElement = (event.target as HTMLElement).closest('.top-bar');
                        const frame = (topBarElement as HTMLElement).querySelector('.frame');
                        (frame as HTMLElement).classList.toggle('visible');
                    }
                }
            }, 'div'),
            frame: new Frame({
                attr: {
                    class: 'frame'
                },
                content: [
                    new ButtonAction({
                        attr: {
                            class: 'button-frame'
                        },
                        action: 'Добавить пользователя',
                        events: {
                            click: (event) => {
                                const avatarModal = document.querySelector('#add-user-modal') as HTMLElement;
                                avatarModal.style.display = 'flex';
                            }
                        }
                    }, 'button'),
                    new ButtonAction({
                        attr: {
                            class: 'button-frame'
                        },
                        action: 'Удалить пользователя',
                        events: {
                            click: () => {
                                const avatarModal = document.querySelector('#delete-user-modal') as HTMLElement;
                                avatarModal.style.display = 'flex';
                            }
                        }
                    }, 'button'),
                ],
            }, 'div'),
            messages: props.currentChat.messages.length > 0
                ? props.currentChat.messages.map((message) => {
                    return new Message({
                        attr: {
                            class: message.user_id === props.user.id ? 'outcoming-message' : 'incoming-message'
                        },
                        message: message.content
                    }, 'div')
                })
                : "",
            form: new Form({
                attr: {
                    class: 'form',
                    name: "message-form",
                    id: "message-form"
                },
                content: new MessageForm({
                    attr: {
                        class: 'form-wrapper'
                    },
                    attach: new Attach({
                        attr: {
                            class: 'attach'
                        },
                    }, 'div'),
                    messageInput: new Input({
                        attr: {
                            class: "input-field",
                            type: "text",
                            name: "message",
                            placeholder: "Сообщение"
                        },
                    }, 'input'),
                    buttonSend: new ButtonAction({
                        attr: {
                            class: 'button-send',
                            type: 'submit',
                            form: 'message-form'
                        },
                    }, 'button')
                }, 'div'),
                events: {
                    submit: async (event: Event) => {
                        event.preventDefault();

                        const input = (event.target as HTMLElement).querySelector('input') as HTMLInputElement;

                        if (inputValidation(input)) {
                            const request = async() => {
                                try {
                                    await messageController.send({
                                        content: input.value,
                                        type: "message"
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            };
                            await request();

                            (event.target as HTMLFormElement).reset();
                        }
                    }
                }
            }, 'form')
        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default ChatFeed;
