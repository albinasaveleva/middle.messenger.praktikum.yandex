import Avatar from "../../components/avatar";
import ButtonLink from "../../components/button-link";
import Chat from "../../components/chat";
import ChatFeed from "../../components/chat-feed";
import Chats from "../../components/chats";
import EmptyChatFeed from "../../components/empty-chat-feed";
import Input from "../../components/input";

const chatPageProps = [
  'main',
  {
    attr: {
      class: 'chat-page',
      id: 'chat-page'
    },
    chats: new Chats('div', {
      attr: {
        class: 'chats'
      },
      buttonLink: new ButtonLink('a', {
        attr: {
          class: 'profile-link',
          href: '/profile'
        },
        action: 'Профиль'
      }),
      searchInput: new Input('input', {
        attr: {
          class: "search-input", 
          name: "search",
          type: "text",
          placeholder: "Поиск"
        }
      }),
      chat: new Chat('div', {
        attr: {
          class: 'chat'
        },
        avatar: new Avatar('div', {
          attr: {
            class: 'avatar'
          }
        })
      })
    }),
    chatFeed: new EmptyChatFeed('div', {
      attr: {
        class: 'empty-chat-feed'
      }
    })
  }
];

export default chatPageProps;
