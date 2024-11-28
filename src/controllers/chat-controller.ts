import chatApi from "../api/chat-api";
import store from "../store";
import { isEqual } from "../utils/utils";

class ChatController {
    async getChats() {
        const {user} = store.getState()

        if (user) {
            await chatApi.getChats()
                .then(({response}) => {
                    const {chatList} = store.getState();

                    if (response.length > 0 && !isEqual(response, chatList)) {
                        store.set('chatList', response)
                    }
                })
                .catch(({reason}) => console.log(reason))
        }
    }
    async addChat(data: any) {
        await chatApi.addChat(data)
    }
    deleteChat() {
        chatApi.deleteChat()
    }
    addUser(data: any) {
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
