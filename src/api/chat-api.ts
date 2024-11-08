import BaseAPI from "./base-api";

class ChatAPI extends BaseAPI {
    create() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return this.transport.post('');
    }

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return this.transport.get('');
    }
}

export default ChatAPI;
