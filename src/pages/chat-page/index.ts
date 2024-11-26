import ChatPage from './chat-page';
import Chat from '../../components/chat/index';
import Avatar from '../../components/avatar/index';
import ChatFeed from '../../components/chat-feed/index';
import ButtonAction from '../../components/button-action/index';
import Modal from '../../components/modal/index';
import AddUserModal from '../../modals/add-user-modal/index';
import DeleteUserModal from '../../modals/delete-user-modal/index';
import Input from '../../components/input/index';
import Chats from '../../components/chats/index';
import ButtonLink from '../../components/button-link/index';
import AddChatModal from '../../modals/add-chat-modal/index';
import EmptyChatFeed from '../../components/empty-chat-feed/index';

import Connect from "../../utils/connect";
import chatController from '../../controllers/chat-controller';
import messageController from '../../controllers/message-controller';
import store from '../../store';
import Router from '../../utils/router';

const router = new Router("#app");

export default Connect(ChatPage, (state) => {
    return {
        user: state.user,
        chatList: state.chatList,
        currentChat: state.currentChat,
        socketReadyState: state.socketReadyState,
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
                                const connect = async () => {
                                    const currentChatId = chatId;
                                    const { token: currentChatToken } = await chatController.getToken(chatId);

                                    await messageController.connect(state.user.id, currentChatId, currentChatToken);
                                }
                                const closeConnect = async () => {
                                    await messageController.close();
                                }

                                if (!state.currentChat) {
                                    store.set('currentChat', {
                                        id: chatId,
                                        title: chat.title,
                                        messages: []
                                    });
                                    await connect();
                                } else if (state.currentChat && state.currentChat.id !== chatId) {
                                    await closeConnect();

                                    store.set('currentChat', {
                                        id: chatId,
                                        title: chat.title,
                                        messages: []
                                    });

                                    await connect();
                                }

                                // if (state.socketReadyState === 1) {
                                //     messageController.getOld(0);
                                // }
                            }
                        }
                    }, 'div')
                }),
        }, 'div'),
        chatFeed: state.currentChat && state.socketReadyState === 1
            ? new ChatFeed()
            : new EmptyChatFeed(),
        modal: [
            new Modal({
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
            }, 'div'),
            new Modal({
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
            }, 'div'),
            new Modal({
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
        ]
    }
});

