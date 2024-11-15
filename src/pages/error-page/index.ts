import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Error from "../../components/error";
import ButtonLink from "../../components/button-link";
import ChatPage from '../chat-page';
import connect from '../../utils/connect';

class ErrorPage extends Component {
  constructor(changePageContent: any) {
    super({
      attr: {
        class: 'error-page',
        id: 'error-page'
      },
      error: new Error({
        attr: {
          class: 'error-wrapper'
        },
        title: '500',
        subtitle: 'Мы уже фиксим',
        buttonLink: new ButtonLink({
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
        }, 'a')
      }, 'div')
    }, 'div')
  }
  render() {
    return this.compile(tpl);
  }
}
export default connect(ErrorPage);
