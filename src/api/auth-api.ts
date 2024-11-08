import BaseAPI,
    {
        AUTH_LOGOUT_ENDPOINT,
        AUTH_SIGNIN_ENDPOINT,
        AUTH_SIGNUP_ENDPOINT,
        AUTH_USER_ENDPOINT
    } from "./base-api";

class AuthApi extends BaseAPI {
    signup(formData: FormData) {
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        this.transport.post(AUTH_SIGNUP_ENDPOINT, {data: formData});
    }

    signin(formData: FormData) {
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        this.transport.post(AUTH_SIGNIN_ENDPOINT, {data: formData});
    }

    logout() {
        this.transport.post(AUTH_LOGOUT_ENDPOINT);
    }

    getUser() {
        this.transport.get(AUTH_USER_ENDPOINT);
    }
}

export default AuthApi;
