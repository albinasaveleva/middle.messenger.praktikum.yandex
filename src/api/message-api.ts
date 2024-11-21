import BaseAPI, { WS_CHATS_ENDPOINT } from "./base-api";

class MessageApi extends BaseAPI {
    async connect(userId: number, chatId: number, token: number) {
        this.wstransport.connect(`${WS_CHATS_ENDPOINT}/${userId}/${chatId}/${token}`);

    }
    async close() {
        this.wstransport.close()
    }
    async send(data: string | number | object) {
        this.wstransport.send(data);
    }
    async getOld(number: number) {
        this.wstransport.send({
            content: number,
            type: 'get old',
          })
    }
    getStatus() {
        return this.wstransport.getStatus()
    }
}

export default new MessageApi();
