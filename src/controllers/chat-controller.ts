import chatApi from "../api/chat-api";
import store from "../store";

class ChatController {
    async getChats() {
        await chatApi.getChats()
            .then(({response}) => {
                if (response.length > 0) {
                    store.set('chats', response)
                }
                console.log(store.getState())
            })
            .catch(({reason}) => console.log(reason))
    }
    async addChat(data: {[key: string]: string}) {
        await chatApi.addChat(data)
    }
    deleteChat() {
        chatApi.deleteChat()
    }
    addUser(data: {[key: string]: number}) {
        chatApi.addUser(data)
    }
    deleteUser(data: {[key: string]: number}) {
        chatApi.deleteUser(data)
    }
    async getToken(id: number) {
        await chatApi.getToken(id)
            .then(({response}) => store.set('currentChat', response))
    }
}

export default new ChatController();
