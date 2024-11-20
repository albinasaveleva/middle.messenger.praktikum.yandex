import BaseAPI, { CHATS_ADD_ENDPOINT, CHATS_ADD_USER_ENDPOINT, CHATS_DELETE_ENDPOINT, CHATS_DELETE_USER_ENDPOINT, CHATS_GET_ENDPOINT, CHATS_GET_TOKEN_ENDPOINT } from "./base-api";

class ChatAPI extends BaseAPI {
    async getChats() {
        return this.transport.get(CHATS_GET_ENDPOINT)
    }
    async addChat(data: {[key: string]: string}) {
        return this.transport.post(CHATS_ADD_ENDPOINT, {data})
    }
    deleteChat() {
        return this.transport.delete(CHATS_DELETE_ENDPOINT)
    }
    addUser(data: {[key: string]: number}) {
        return this.transport.put(CHATS_ADD_USER_ENDPOINT, {data})
    }
    deleteUser(data: {[key: string]: number}) {
        return this.transport.delete(CHATS_DELETE_USER_ENDPOINT, {data})
    }
    async getToken(id: number) {
        return this.transport.post(`${CHATS_GET_TOKEN_ENDPOINT}/${id}`)
    }
}

export default new ChatAPI();
