import chatApi from "../api/chat-api";
import store from "../store";

class ChatController {
    async getChats() {
        await chatApi.getChats()
            .then(({response}) => {
                if (response.length > 0) {
                    store.set('chatList', response)
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
    addUser(data: {[key: string]: string}) {
        chatApi.addUser(data)
    }
    deleteUser(data: {[key: string]: string}) {
        chatApi.deleteUser(data)
    }
    async getToken(id: number) {
        return await chatApi.getToken(id)
            .then(({response}) => response)
    }
}

export default new ChatController();
