import messageController from '../../controllers/message-controller';
import Connect from '../../utils/connect';
import Message from '../message/index';
import ChatFeed from './chat-feed';

export default Connect(ChatFeed, (state) => {
    const getMessages = () => {
        // messageController.getOld(0);
        // if (state.socketReadyState === 1 && state.currentChat.messages.length === 0) {
        //     return "";
        // } else if (state.socketReadyState === 1 && state.currentChat.messages.length > 0) {
            // return state.currentChat.messages.map((message) => {
            //     return new Message({
            //         attr: {
            //             class: 'outcoming-message'
            //         },
            //         message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
            //     }, 'div')
            // })
        // } else if (state.socketReadyState === 0) {

        //     return "";
        // } else {
        //     return "";
        // }
    }
    return {
        user: state.user,
        chatList: state.chatList,
        currentChat: state.currentChat,
        socketReadyState: state.socketReadyState,
        title: state.currentChat.title,
        // messages: state.currentChat.messages.length > 0
        //     ? state.currentChat.messages.map((message) => {
        //         return new Message({
        //             attr: {
        //                 class: message.user_id === state.user.id ? 'outcoming-message' : 'incoming-message'
        //                 // class: 'outcoming-message'
        //             },
        //             message: message.content
        //         }, 'div')
        //     })
        //     : ""
    }
});
