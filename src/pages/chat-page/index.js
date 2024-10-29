import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from '../../components/avatar';
import Chat from '../../components/chat';
import Chats from '../../components/chats';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import EmptyChatFeed from '../../components/empty-chat-feed';

export default class ChatPage extends Component {
  constructor() {
    super('div', {
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
    })
  }
  render() {
    return this.compile(tpl);
  }
}

