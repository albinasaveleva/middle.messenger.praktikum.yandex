import authApi from "../api/auth-api";
import store from "../store";

class AuthController {
    signup(data: {[key: string]: string}) {
        authApi.signup(data)
    }

    signin(data: {[key: string]: string}) {
        authApi.signin(data)
    }

    logout() {
        authApi.logout()
            .then((response) => {
                if (response.status === 200) {
                    store.set('user', null);
                }
            })
    }
}

export default new AuthController();

