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
const renderChatFeed = (checkedOld: boolean) => {
    if (!checkedOld) {
        messageController.getOld(0);
        store.set('currentChat', {
            checkedOld: true,
        });
    }
    return new ChatFeed();
}
const renderChatTimeStamp = (time: string) => {
    const today = new Date();
    const timestamp =  new Date(time);
    let timestampProp = '';

    if (today.getUTCFullYear() === timestamp.getUTCFullYear() && today.getUTCMonth() === timestamp.getUTCMonth() && today.getUTCDate() === timestamp.getUTCDate()) {
        let hours;
        switch (timestamp.getUTCHours()) {
            case 0:
                hours = '00'
                break;
            case 1:
                hours = '01'
                break;
            case 2:
                hours = '02'
                break;
            case 3:
                hours = '03'
                break;
            case 4:
                hours = '04'
                break;
            case 5:
                hours = '05'
                break;
            case 6:
                hours = '06'
                break;
            case 7:
                hours = '07'
                break;
            case 8:
                hours = '08'
                break;
            case 9:
                hours = '09'
                break;
            default:
                hours = timestamp.getUTCHours();
                break;
        }

        let minutes;
        switch (timestamp.getUTCMinutes()) {
            case 0:
                minutes = '00'
                break;
            case 1:
                minutes = '01'
                break;
            case 2:
                minutes = '02'
                break;
            case 3:
                minutes = '03'
                break;
            case 4:
                minutes = '04'
                break;
            case 5:
                minutes = '05'
                break;
            case 6:
                minutes = '06'
                break;
            case 7:
                minutes = '07'
                break;
            case 8:
                minutes = '08'
                break;
            case 9:
                minutes = '09'
                break;
            default:
                minutes = timestamp.getUTCMinutes();
                break;
        }

        timestampProp = `${hours}:${minutes}`
    } else {
        const date = timestamp.getUTCDate();

        let month;
        switch (timestamp.getUTCMonth()) {
            case 0:
                month = ' Янв'
                break;
            case 1:
                month = ' Фев'
                break;
            case 2:
                month = ' Мар'
                break;
            case 3:
                month = ' Апр'
                break;
            case 4:
                month = ' Мая'
                break;
            case 5:
                month = ' Июня'
                break;
            case 6:
                month = ' Июля'
                break;
            case 7:
                month = ' Авг'
                break;
            case 8:
                month = ' Сен'
                break;
            case 9:
                month = ' Окт'
                break;
            case 10:
                month = ' Нояб'
                break;
            case 11:
                month = ' Дек'
                break;
            default:
                break;
        }

        const year = today.getUTCFullYear() === timestamp.getUTCFullYear() ? '' : ` ${timestamp.getUTCFullYear()}`;

        timestampProp = `${date}${month}${year}`
    }

    return `<span class="timestamp">${timestampProp}</span>`
}

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
                            : renderChatTimeStamp(chat.last_message.time),
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
                                        messages: [],
                                        checkedOld: false,
                                    });
                                    await connect();
                                } else if (state.currentChat && state.currentChat.id !== chatId) {
                                    await closeConnect();
                                    store.set('socketReadyState', null);
                                    store.set('currentChat', {
                                        id: chatId,
                                        title: chat.title,
                                        messages: [],
                                        checkedOld: false,
                                    });

                                    await connect();
                                }
                            }
                        }
                    }, 'div')
                }),
        }, 'div'),
        chatFeed: state.currentChat && state.chatList.some((chat) => Number(chat.id) === Number(state.currentChat.id)) && state.socketReadyState === 1
            ? renderChatFeed(state.currentChat.checkedOld)
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

