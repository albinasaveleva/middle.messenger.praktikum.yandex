import messageApi from "../api/message-api";
import store from "../store";

class MessageController {
    // messageApi = new MessageApi();

    async connect(userId: number, chatId: number, token: number) {
        await messageApi.connect(userId, chatId, token)
    }
    async close() {
        await messageApi.close()
    }
    async send(data: string | number | object) {
        await messageApi.send(data)
    }
    async getOld(number: number) {
        await messageApi.getOld(number)
            .then((response) => console.log(response))
    }
    getStatus() {
        return messageApi.getStatus()?.readyState;
    }
}

export default new MessageController();
