import authApi from "../api/auth-api";
import store from "../store";

class AuthController {
    signup(data: {[key: string]: string}) {
        authApi.signup(data)
            .then((response) => {
                if (response.status === 200) {
                    store.set('authorization', true);
                }
            })
    }

    signin(data: {[key: string]: string}) {
        authApi.signin(data)
            .then((response) => {
                if (response.status === 200) {
                    store.set('authorization', true);
                }
            })
    }

    logout() {
        authApi.logout()
            .then((response) => {
                if (response.status === 200) {
                    store.set('authorization', false);
                }
            })
    }
}

export default new AuthController();

