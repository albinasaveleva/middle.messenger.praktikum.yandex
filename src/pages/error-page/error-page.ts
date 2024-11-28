import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import ChatPage from '../chat-page/index';
import Error from "../../components/error/index";
import ButtonLink from "../../components/button-link/index";

class ErrorPage extends Component {
  constructor(props: any) {
    super({
        ...props,
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
    return this.compile(tpl);
  }
}
export default ErrorPage;
