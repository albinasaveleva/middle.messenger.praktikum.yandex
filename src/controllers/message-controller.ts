import MessageApi from "../api/message-api";
import store from "../store";

class MessageController {
    messageApi = new MessageApi();

    async connect(userId: number, chatId: number, token: number) {
        await this.messageApi.connect(userId, chatId, token)
    }
    async close() {
        await this.messageApi.close()
    }
    async send(data: string | number | object) {
        await this.messageApi.send(data)
    }
    async getOld(number: number) {
        await this.messageApi.getOld(number)
            .then((response) => console.log(response))
    }
}

export default MessageController;
