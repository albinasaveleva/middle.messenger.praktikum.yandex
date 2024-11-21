import authApi from "../api/auth-api";
import store from "../store";

class AuthController {
    async signup(data: {[key: string]: string}) {
        await authApi.signup(data);
    }

    async signin(data: {[key: string]: string}) {
        await authApi.signin(data);
    }

    logout() {
        authApi.logout()
            .then((response) => {
                if (response.status === 200) {
                    store.cleanState();
                }
            })
    }
}

export default new AuthController();

