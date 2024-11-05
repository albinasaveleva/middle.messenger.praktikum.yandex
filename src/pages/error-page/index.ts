import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Error from "../../components/error";
import ButtonLink from "../../components/button-link";
import ChatPage from '../chat-page';

export default class ErrorPage extends Component {
  constructor(changePageContent: any) {
    super('div', {
      attr: {
        class: 'error-page',
        id: 'error-page'
      },
      error: new Error('div', {
        attr: {
          class: 'error-wrapper'
        },
        title: '500',
        subtitle: 'Мы уже фиксим',
        buttonLink: new ButtonLink('a', {
          attr: {
            href: '/chats',
            class: 'button-link'
          },
          action: 'Назад к чатам',
          events: {
            click: (event: Event) => {
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
    return this.compile(tpl);
  }
}
