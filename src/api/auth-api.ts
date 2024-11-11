import BaseAPI,
    {
        AUTH_LOGOUT_ENDPOINT,
        AUTH_SIGNIN_ENDPOINT,
        AUTH_SIGNUP_ENDPOINT
    } from "./base-api";

class AuthApi extends BaseAPI {
    signup(data: {[key: string]: string}) {
        return this.transport.post(AUTH_SIGNUP_ENDPOINT, {data})
    }

    signin(data: {[key: string]: string}) {
        return this.transport.post(AUTH_SIGNIN_ENDPOINT, {data})
    }

    logout() {
        return this.transport.post(AUTH_LOGOUT_ENDPOINT);
    }
}

export default new AuthApi();
