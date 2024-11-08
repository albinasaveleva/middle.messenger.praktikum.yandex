import { HTTPTransport } from "../utils/HTTPTransport";

export const BASE_API_URL = 'https://ya-praktikum.tech/api/v2';

export const AUTH_SIGNUP_ENDPOINT = '/auth/signup';
export const AUTH_SIGNIN_ENDPOINT = '/auth/signin';
export const AUTH_USER_ENDPOINT = '/auth/user';
export const AUTH_LOGOUT_ENDPOINT = '/auth/logout';

export const USER_GET_INFO_ENDPOINT = '/user/';
export const USER_SEARCH_ENDPOINT = '/user/search';
export const USER_UPDATE_PROFILE_ENDPOINT = '/user/profile';
export const USER_UPDATE_AVATAR_ENDPOINT = '/user/profile/avatar';
export const USER_UPDATE_PASSWORD_ENDPOINT = '/user/password';

export const CHATS_GET_ENDPOINT = '/chats';
export const CHATS_ADD_ENDPOINT = '/chats';
export const CHATS_DELETE_ENDPOINT = '/chats';
export const CHATS_ADD_USER_ENDPOINT = '/chats/users';
export const CHATS_DELETE_USER_ENDPOINT = '/chats/users';


class BaseAPI {
    transport;

    constructor() {
        this.transport = new HTTPTransport();
    }
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    create() { throw new Error('Not implemented'); }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}

export default BaseAPI;
