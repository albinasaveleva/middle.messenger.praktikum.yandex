import tpl from './tpl.tmpl';
import Component from '../../utils/component';

import Avatar from '../../components/avatar/avatar';
import Chat from '../../components/chat';
import Chats from '../../components/chats';
import ButtonLink from '../../components/button-link';
import Input from '../../components/input';
import EmptyChatFeed from '../../components/empty-chat-feed';
import ChatFeed from '../../components/chat-feed';
import ButtonAction from '../../components/button-action';
import Form from '../../components/form';
import MessageForm from '../../forms/message-form';
import { inputValidation } from '../../utils/formValidation';
import Message from '../../components/message';
import Attach from '../../components/attach/attach';
import Actions from '../../components/actions/actions';
import Router from '../../utils/router';
import chatController from '../../controllers/chat-controller';
import store from '../../store';
import AddChatModal from '../../modals/add-chat-modal';
import Modal from '../../components/modal';
import Frame from '../../components/frame';
import AddUserModal from '../../modals/add-user-modal';
import DeleteUserModal from '../../modals/delete-user-modal';
import messageController from '../../controllers/message-controller';

class ChatPage extends Component {
    constructor(props: any) {
        console.log(props)
        super({
            ...props,
            attr: {
                class: 'chat-page',
                id: 'chat-page'
            },
            chats: props.chats,
            chatFeed: new EmptyChatFeed({
                attr: {
                    class: 'chat-feed'
                }
            }, 'div'),

        }, 'div')
    }
    render() {
        return this.compile(tpl);
    }
}
export default ChatPage;
