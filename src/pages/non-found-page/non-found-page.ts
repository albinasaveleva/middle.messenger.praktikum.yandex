import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Error from "../../components/error/index";
import ButtonLink from "../../components/button-link/index";
import ChatPage from '../chat-page/index';

class NonFoundPage extends Component {
  constructor(props: any) {
    super({
        ...props,
        attr: {
            class: 'non-found-page',
            id: 'non-found-page'
        },
        error: new Error({
            attr: {
            class: 'error-wrapper'
            },
            title: '404',
            subtitle: 'Не туда попали',
            buttonLink: new ButtonLink({
            attr: {
                href: '/chats',
                class: 'button-link'
            },
            action: 'Назад к чатам',
            events: {
                click: (event: Event) => {
                event.preventDefault();
                props.changePageContent({
                    content: new ChatPage(props.changePageContent)
                });
                }
            }
            }, 'a')
        }, 'div')
    }, 'div')
  }
  render() {
    return this.compile(tpl)
  }
}
export default NonFoundPage;
