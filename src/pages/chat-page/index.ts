import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from '../../components/avatar';
import Chat from '../../components/chat';
import Chats from '../../components/chats';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import EmptyChatFeed from '../../components/empty-chat-feed';
import ChatFeed from '../../components/chat-feed';
import ButtonAction from '../../components/button-action';
import Form from '../../components/form';
import MessageForm from '../../forms/message-form';
import { inputValidation } from '../../utils/formValidation';
import Message from '../../components/message';
import Attach from '../../components/attach';
import Actions from '../../components/actions';
import Router from '../../utils/router';
import connect from '../../utils/connect';

const router = new Router("#app");

class ChatPage extends Component {
  constructor() {

    super({
        attr: {
            class: 'chat-page',
            id: 'chat-page'
        },
        chats: new Chats({
            attr: {
                class: 'chats'
            },
            buttonLink: new ButtonLink({
                attr: {
                    class: 'profile-link',
                },
                action: 'Профиль',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        router.go('/settings');
                    }
                }
            }, 'a'),
            searchInput: new Input({
                attr: {
                    class: "search-input",
                    name: "search",
                    type: "text",
                    placeholder: "Поиск"
                }
            }, 'input'),
            chat: new Chat({
                attr: {
                    class: 'chat'
                },
            avatar: new Avatar({
                attr: {
                    class: 'avatar'
                }
            }, 'div'),
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        this.setProps({
                            chatFeed: new ChatFeed({
                            attr: {
                                class: 'chat-feed'
                            },
                            actions: new Actions({
                                attr: {
                                    class: 'actions'
                                },
                            }, 'div'),
                            messages: new Message({
                                attr: {
                                    class: 'outcoming-message'
                                },
                                message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
                            }, 'div'),
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
                                    submit: (event: Event) => {
                                        event.preventDefault();

                                        const inputs = (event.target as HTMLElement).querySelectorAll('input');

                                        if (Array.from(inputs).every(inputValidation)) {
                                        const formData = new FormData(event.target as HTMLFormElement);

                                        for (let pair of formData.entries()) {
                                            console.log(`${pair[0]}: ${pair[1]}`);
                                        }

                                        (event.target as HTMLFormElement).reset();
                                        }
                                    }
                                }
                            }, 'form')

                            }, 'div')
                        })
                    }
                }
            }, 'div')
        }, 'div'),
        chatFeed: new EmptyChatFeed({
            attr: {
                class: 'chat-feed'
            }
        }, 'div')
    }, 'div')
  }
  render() {
    return this.compile(tpl);
  }
}
export default connect(ChatPage);
