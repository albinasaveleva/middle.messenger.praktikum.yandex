import Connect from '../../utils/connect';
import ChatFeed from './chat-feed';

export default Connect(ChatFeed, (state) => {
    return {
        user: state.user,
        chatList: state.chatList,
        currentChat: state.currentChat,
        socketReadyState: state.socketReadyState,
    }
});
