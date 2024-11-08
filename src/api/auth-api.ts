import BaseAPI,
    {
        AUTH_LOGOUT_ENDPOINT,
        AUTH_SIGNIN_ENDPOINT,
        AUTH_SIGNUP_ENDPOINT,
        AUTH_USER_ENDPOINT
    } from "./base-api";

class AuthApi extends BaseAPI {
    signup(data: {[key: string]: string}) {
        this.transport.post(AUTH_SIGNUP_ENDPOINT, {data});
    }

    signin(data: {[key: string]: string}) {
        this.transport.post(AUTH_SIGNIN_ENDPOINT, {data});
    }

    logout() {
        this.transport.post(AUTH_LOGOUT_ENDPOINT);
    }

    getUser() {
        this.transport.get(AUTH_USER_ENDPOINT);
    }
}

export default AuthApi;
