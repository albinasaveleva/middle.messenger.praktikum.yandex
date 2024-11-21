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
import chatController from '../../controllers/chat-controller';
import store from '../../store';
import AddChatModal from '../../modals/add-chat-modal';
import Modal from '../../components/modal';
import Frame from '../../components/frame';
import AddUserModal from '../../modals/add-user-modal';
import DeleteUserModal from '../../modals/delete-user-modal';
import MessageController from '../../controllers/message-controller';

const router = new Router("#app");

class ChatPage extends Component {
    constructor(props: any) {
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
                buttonAdd: new ButtonAction({
                    attr: {
                        class: 'button-add'
                    },
                    action: 'Добавить новый чат',
                    events: {
                        click: () => {
                            this.setProps({
                                modal: new Modal({
                                    attr: {
                                        class: 'modal',
                                        id: 'add-chat-modal'
                                    },
                                    content: new AddChatModal(),
                                    events: {
                                        click: (event: Event) => {
                                            if ((event.target as HTMLElement).classList.contains("modal")) {
                                                (event.target as HTMLElement).style.display = 'none';
                                            }
                                        }
                                    }
                                }, 'div')
                            })
                            const avatarModal = document.querySelector('#add-chat-modal') as HTMLElement;
                            avatarModal.style.display = 'flex';
                        }
                    }
                }, 'button'),
                content: props.chats.length === 0
                    ? ''
                    : props.chats.map((chat: any) => {
                        return new Chat({
                            attr: {
                                class: 'chat',
                                "data-chat-id": chat.id,
                            },
                            avatar: new Avatar({
                                attr: {
                                    class: 'avatar'
                                }
                            }, 'div'),
                            title: `<span class="title">${chat.title}</span>`,
                            timestamp: chat.last_message === null
                                ? ''
                                : `<span class="timestamp">12:00</span>`,
                            content: chat.last_message === null
                                ? ''
                                : `<span class="content">${chat.last_message.content}</span>`,
                            count: chat.unread_count === 0
                                ? ''
                                : `<span class="count">${chat.unread_count}</span>` ,
                            events: {
                                click: async (event: Event) => {
                                    event.preventDefault();
                                    const messageController = new MessageController();

                                    const chatId = (event.target as HTMLElement).closest('.chat')?.dataset.chatId;

                                    // if (chatId !== store.getState().currentChat?.id) {
                                    //     await new MessageController.close();
                                    // }

                                    store.set('currentChat', { id: chatId });

                                    const connect = async () => {
                                        const currentChatId = chatId;
                                        const { token: currentChatToken } = await chatController.getToken(chatId);

                                        await messageController.connect(props.user?.id, currentChatId, currentChatToken);

                                    }
                                    await connect();
                                    // await messageController.getOld(0)
                                    window.setTimeout(() => { messageController.close()}, 5000);


                                    this.setProps({
                                        chatFeed: new ChatFeed({
                                            attr: {
                                                class: 'chat-feed'
                                            },
                                            title: chat.title,
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
                                                            click: () => {
                                                                this.setProps({
                                                                    modal: new Modal({
                                                                        attr: {
                                                                            class: 'modal',
                                                                            id: 'add-user-modal'
                                                                        },
                                                                        content: new AddUserModal(),
                                                                        events: {
                                                                            click: (event: Event) => {
                                                                                if ((event.target as HTMLElement).classList.contains("modal")) {
                                                                                (event.target as HTMLElement).style.display = 'none';
                                                                                }
                                                                            }
                                                                        }
                                                                    }, 'div')
                                                                })
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
                                                                this.setProps({
                                                                    modal: new Modal({
                                                                        attr: {
                                                                            class: 'modal',
                                                                            id: 'delete-user-modal'
                                                                        },
                                                                        content: new DeleteUserModal(),
                                                                        events: {
                                                                            click: (event: Event) => {
                                                                                if ((event.target as HTMLElement).classList.contains("modal")) {
                                                                                (event.target as HTMLElement).style.display = 'none';
                                                                                }
                                                                            }
                                                                        }
                                                                    }, 'div')
                                                                })
                                                                const avatarModal = document.querySelector('#delete-user-modal') as HTMLElement;
                                                                avatarModal.style.display = 'flex';
                                                            }
                                                        }
                                                    }, 'button'),
                                                ],
                                            }, 'div'),
                                            messages: [
                                                new Message({
                                                    attr: {
                                                        class: 'outcoming-message'
                                                    },
                                                    message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
                                                }, 'div'),
                                                new Message({
                                                    attr: {
                                                        class: 'incoming-message'
                                                    },
                                                    message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
                                                }, 'div'),
                                            ],
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
                                                                    await messageController.send(input.value)
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
                                    })
                                }
                            }
                        }, 'div')
                    })
            }, 'div'),
            chatFeed: new EmptyChatFeed({
                attr: {
                    class: 'chat-feed'
                }
            }, 'div'),

        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default connect(ChatPage);
