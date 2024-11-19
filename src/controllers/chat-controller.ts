import chatApi from "../api/chat-api";
import store from "../store";

class ChatController {
    async getChats() {
        await chatApi.getChats()
            .then(({response}) => {
                if (response.length > 0) {
                    store.set('chats', response)
                }
            })
            .catch(({reason}) => console.log(reason))
    }
    async addChat(data: {[key: string]: string}) {
        await chatApi.addChat(data)
    }
    deleteChat() {
        chatApi.deleteChat()
    }
    addUser() {
        chatApi.addUser()
    }
    deleteUser() {
        chatApi.deleteUser()
    }
}

export default new ChatController();
