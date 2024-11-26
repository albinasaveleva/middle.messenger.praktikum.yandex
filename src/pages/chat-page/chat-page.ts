import tpl from './tpl.tmpl';
import Component from '../../utils/component';

class ChatPage extends Component {
    constructor(props: any) {
        super({
            ...props,
            attr: {
                class: 'chat-page',
                id: 'chat-page'
            },
            chats: props.chats,
            chatFeed: props.chatFeed,
            modal: props.modal
        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default ChatPage;
