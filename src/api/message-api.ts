import { WSTransport } from "../utils/WSTransport";
import BaseAPI, { WS_CHATS_ENDPOINT } from "./base-api";

class MessageApi extends BaseAPI {
    wstransport = new WSTransport()
    async connect(userId: number, chatId: number, token: number) {
        this.wstransport.setEndpoint(`${WS_CHATS_ENDPOINT}/${userId}/${chatId}/${token}`);
        this.wstransport.connect();
    }
    async close() {
        this.wstransport.close();
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
}

export default new MessageApi();
