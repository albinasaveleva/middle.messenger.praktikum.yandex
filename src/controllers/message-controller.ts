import messageApi from "../api/message-api";
import store from "../store";

class MessageController {
    async connect(userId: number, chatId: number, token: number) {
        await messageApi.connect(userId, chatId, token)
    }
    async close() {
        await messageApi.close()
    }
    async send(data: string | number | object) {
        await messageApi.send(data)
    }
}

export default new MessageController();
