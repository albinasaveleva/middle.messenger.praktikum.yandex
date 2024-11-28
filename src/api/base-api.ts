import { HTTPTransport } from "../utils/HTTPTransport";
import { WSTransport } from "../utils/WSTransport";

export const BASE_API_URL = 'https://ya-praktikum.tech/api/v2';
export const BASE_WS_URL = 'wss://ya-praktikum.tech/ws';

export const WS_CHATS_ENDPOINT = 'chats';

export const AUTH_SIGNUP_ENDPOINT = 'auth/signup';
export const AUTH_SIGNIN_ENDPOINT = 'auth/signin';
export const AUTH_USER_ENDPOINT = 'auth/user';
export const AUTH_LOGOUT_ENDPOINT = 'auth/logout';

export const USER_GET_INFO_ENDPOINT = 'user/';
export const USER_GET_AVATAR_ENDPOINT = 'swagger/resources';
export const USER_SEARCH_ENDPOINT = 'user/search';
export const USER_UPDATE_PROFILE_ENDPOINT = 'user/profile';
export const USER_UPDATE_AVATAR_ENDPOINT = 'user/profile/avatar';
export const USER_UPDATE_PASSWORD_ENDPOINT = 'user/password';

export const CHATS_GET_ENDPOINT = 'chats';
export const CHATS_ADD_ENDPOINT = 'chats';
export const CHATS_DELETE_ENDPOINT = 'chats';
export const CHATS_ADD_USER_ENDPOINT = 'chats/users';
export const CHATS_DELETE_USER_ENDPOINT = 'chats/users';
export const CHATS_GET_TOKEN_ENDPOINT = 'chats/token';

class BaseAPI {
    transport;
    wstransport;

    constructor() {
        this.transport = new HTTPTransport();
        this.wstransport = new WSTransport();
    }
}

export default BaseAPI;
