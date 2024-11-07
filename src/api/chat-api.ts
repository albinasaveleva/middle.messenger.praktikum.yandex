import { HTTPTransport } from "../utils/HTTPTransport";
import BaseAPI from "./base-api";


const api = new HTTPTransport();

class ChatAPI extends BaseAPI {
    create() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return api.post();
    }

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return api.get();
    }
}
