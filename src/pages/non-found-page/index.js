import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Error from "../../components/error";
import ButtonLink from "../../components/button-link";
import ChatPage from '../chat-page';

export default class NonFoundPage extends Component {
  constructor(changePageContent) {
    super('div', {
      attr: {
        title: '404',
        subtitle: 'Не туда попали',
      },
      error: new Error('div', {
        attr: {
          class: ''
        },
        title: '404',
        subtitle: 'Не туда попали',
        buttonLink: new ButtonLink('a', {
          attr: {
            href: '/chats',
            class: 'button-link'
          },
          action: 'Назад к чатам',
          events: {
            click: (event) => {
              event.preventDefault();
              // const href = event.target.attributes.href.value;
              // history.pushState(null, null, href);
              changePageContent({
                content: new ChatPage(changePageContent)
              });
            }
          }
        })
      })
    })
  }
  render() {
    return this.compile(tpl)
  }
}

