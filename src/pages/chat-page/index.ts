import ChatPage from './chat-page';
import Connect from "../../utils/connect";
import Chat from '../../components/chat/chat';
import Avatar from '../../components/avatar/avatar';
import store from '../../store';
import chatController from '../../controllers/chat-controller';
import messageController from '../../controllers/message-controller';
import ChatFeed from '../../components/chat-feed/chat-feed';
import Actions from '../../components/actions/actions';
import Frame from '../../components/frame/frame';
import ButtonAction from '../../components/button-action/button-action';
import Modal from '../../components/modal/modal';
import AddUserModal from '../../modals/add-user-modal/add-user-modal';
import DeleteUserModal from '../../modals/delete-user-modal/delete-user-modal';
import Message from '../../components/message/message';
import Form from '../../components/form/form';
import MessageForm from '../../forms/message-form/message-form';
import Attach from '../../components/attach/attach';
import Input from '../../components/input/input';
import { inputValidation } from '../../utils/formValidation';
import Chats from '../../components/chats/chats';
import ButtonLink from '../../components/button-link/button-link';
import Router from '../../utils/router';
import AddChatModal from '../../modals/add-chat-modal/add-chat-modal';

const router = new Router("#app");

export default Connect(ChatPage, (state) => {
    return {
        user: state.user,
        chatList: state.chatList,
        currentChat: state.currentChat,
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
                    click: function () {
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
            content: state.chatList.length === 0
                ? ""
                : state.chatList.map((chat: any) => {
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

                                const chatId = (event.target as HTMLElement).closest('.chat')?.dataset.chatId;

                                // if (chatId !== store.getState().currentChat?.id) {
                                //     await messageController.close();
                                // }

                                // store.set('currentChat', { id: chatId });

                                // const connect = async () => {
                                //     const currentChatId = chatId;
                                //     const { token: currentChatToken } = await chatController.getToken(chatId);

                                //     await messageController.connect(state.user?.id, currentChatId, currentChatToken);

                                // }
                                // await connect();

                                // messageController.getStatus()
                                // await messageController.getOld(0)

                                // this.setProps({
                                //     chatFeed: new ChatFeed({
                                //         attr: {
                                //             class: 'chat-feed'
                                //         },
                                //         title: chat.title,
                                //         actions: new Actions({
                                //             attr: {
                                //                 class: 'actions'
                                //             },
                                //             events: {
                                //                 click: (event: Event) => {
                                //                     const topBarElement = (event.target as HTMLElement).closest('.top-bar');
                                //                     const frame = (topBarElement as HTMLElement).querySelector('.frame');
                                //                     (frame as HTMLElement).classList.toggle('visible');
                                //                 }
                                //             }
                                //         }, 'div'),
                                //         frame: new Frame({
                                //             attr: {
                                //                 class: 'frame'
                                //             },
                                //             content: [
                                //                 new ButtonAction({
                                //                     attr: {
                                //                         class: 'button-frame'
                                //                     },
                                //                     action: 'Добавить пользователя',
                                //                     events: {
                                //                         click: () => {
                                //                             this.setProps({
                                //                                 modal: new Modal({
                                //                                     attr: {
                                //                                         class: 'modal',
                                //                                         id: 'add-user-modal'
                                //                                     },
                                //                                     content: new AddUserModal(),
                                //                                     events: {
                                //                                         click: (event: Event) => {
                                //                                             if ((event.target as HTMLElement).classList.contains("modal")) {
                                //                                             (event.target as HTMLElement).style.display = 'none';
                                //                                             }
                                //                                         }
                                //                                     }
                                //                                 }, 'div')
                                //                             })
                                //                             const avatarModal = document.querySelector('#add-user-modal') as HTMLElement;
                                //                             avatarModal.style.display = 'flex';
                                //                         }
                                //                     }
                                //                 }, 'button'),
                                //                 new ButtonAction({
                                //                     attr: {
                                //                         class: 'button-frame'
                                //                     },
                                //                     action: 'Удалить пользователя',
                                //                     events: {
                                //                         click: () => {
                                //                             this.setProps({
                                //                                 modal: new Modal({
                                //                                     attr: {
                                //                                         class: 'modal',
                                //                                         id: 'delete-user-modal'
                                //                                     },
                                //                                     content: new DeleteUserModal(),
                                //                                     events: {
                                //                                         click: (event: Event) => {
                                //                                             if ((event.target as HTMLElement).classList.contains("modal")) {
                                //                                             (event.target as HTMLElement).style.display = 'none';
                                //                                             }
                                //                                         }
                                //                                     }
                                //                                 }, 'div')
                                //                             })
                                //                             const avatarModal = document.querySelector('#delete-user-modal') as HTMLElement;
                                //                             avatarModal.style.display = 'flex';
                                //                         }
                                //                     }
                                //                 }, 'button'),
                                //             ],
                                //         }, 'div'),
                                //         messages: [
                                //             new Message({
                                //                 attr: {
                                //                     class: 'outcoming-message'
                                //                 },
                                //                 message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
                                //             }, 'div'),
                                //             new Message({
                                //                 attr: {
                                //                     class: 'incoming-message'
                                //                 },
                                //                 message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
                                //             }, 'div'),
                                //         ],
                                //         form: new Form({
                                //             attr: {
                                //                 class: 'form',
                                //                 name: "message-form",
                                //                 id: "message-form"
                                //             },
                                //             content: new MessageForm({
                                //                 attr: {
                                //                     class: 'form-wrapper'
                                //                 },
                                //                 attach: new Attach({
                                //                     attr: {
                                //                         class: 'attach'
                                //                     },
                                //                 }, 'div'),
                                //                 messageInput: new Input({
                                //                     attr: {
                                //                         class: "input-field",
                                //                         type: "text",
                                //                         name: "message",
                                //                         placeholder: "Сообщение"
                                //                     },
                                //                 }, 'input'),
                                //                 buttonSend: new ButtonAction({
                                //                     attr: {
                                //                         class: 'button-send',
                                //                         type: 'submit',
                                //                         form: 'message-form'
                                //                     },
                                //                 }, 'button')
                                //             }, 'div'),
                                //             events: {
                                //                 submit: async (event: Event) => {
                                //                     event.preventDefault();

                                //                     const input = (event.target as HTMLElement).querySelector('input') as HTMLInputElement;

                                //                     if (inputValidation(input)) {
                                //                         const request = async() => {
                                //                             try {
                                //                                 await messageController.send(input.value)
                                //                             } catch (error) {
                                //                                 console.log(error)
                                //                             }
                                //                         };
                                //                         await request();

                                //                         (event.target as HTMLFormElement).reset();
                                //                     }
                                //                 }
                                //             }
                                //         }, 'form')
                                //     }, 'div')
                                // })
                            }
                        }
                    }, 'div')
                }),
        }, 'div'),
    }
});
