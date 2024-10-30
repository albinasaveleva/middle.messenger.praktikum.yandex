import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from '../../components/avatar';
import Chat from '../../components/chat';
import Chats from '../../components/chats';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import EmptyChatFeed from '../../components/empty-chat-feed';
import ProfilePage from '../profile-page';
import ChatFeed from '../../components/chat-feed';
import ButtonAction from '../../components/button-action';
import Form from '../../components/form';
import MessageForm from '../../forms/message-form';
import { inputValidation } from '../../utils/formValidation';

export default class ChatPage extends Component {
  constructor(changePageContent) {
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
          action: 'Профиль',
          events: {
            click: (event) => {
              event.preventDefault();
              // const href = event.target.attributes.href.value;
              // history.pushState(null, null, href);
              changePageContent({
                content: new ProfilePage(changePageContent)
              });
            }
          }
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
          }),
          events: {
            click: (event) => {
              event.preventDefault();
              // const href = event.target.attributes.href.value;
              // history.pushState(null, null, href);
              this.setProps({
                chatFeed: new ChatFeed('div', {
                  attr: {
                    class: 'chat-feed'
                  },
                  form: new Form('form', {
                    attr: {
                      class: 'form',
                      name: "message-form",
                      id: "message-form"
                    },
                    content: new MessageForm('div', {
                      attr: {
                        class: 'form-wrapper'
                      },
                      messageInput: new Input('input', {
                        attr: {
                          class: "input-field",
                          type: "text",
                          name: "message",
                          placeholder: "Сообщение"
                        },
                      }),
                      buttonSend: new ButtonAction('button', {
                        attr: {
                          class: 'button-send',
                          type: 'submit',
                          form: 'message-form'
                        },
                      })
                    }),
                    events: {
                      submit: (event) => {
                        event.preventDefault();
            
                        let error = false;
                        const inputs = event.target.querySelectorAll('input');
                        inputs.forEach(input => {
                          if (inputValidation(input)) {
                            error = false;
                          } else {
                            error = true;
                          }
                        })

                        if (!error) {
                          const formData = new FormData(event.target);
            
                          for (let pair of formData.entries()) {
                            console.log(`${pair[0]}: ${pair[1]}`);
                          }
            
                          event.target.reset();
                        } 
                      }
                    }
                  })
                  
                })
              })
            }
          }
        })
      }),
      chatFeed: new EmptyChatFeed('div', {
        attr: {
          class: 'chat-feed'
        }
      })
    })
  }
  render() {
    return this.compile(tpl);
  }
}
