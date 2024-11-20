import { WSTransport } from "../utils/WSTransport";
import BaseAPI, { WS_CHATS_ENDPOINT } from "./base-api";

class MessageApi extends BaseAPI {
    connect(userId: number, chatId: number, token: number) {
        const wstransport = new WSTransport();
        wstransport.setEndpoint(`${WS_CHATS_ENDPOINT}/${userId}/${chatId}/${token}`);
        wstransport.connect();

    }
}

export default new MessageApi();
