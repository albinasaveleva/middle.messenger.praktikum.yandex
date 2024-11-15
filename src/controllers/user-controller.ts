import UserApi from "../api/user-api";
import store from "../store";

class UserController {
    async getUser() {
        await UserApi.getUser()
            .then(({response}) => store.set('user', response))
    }
    deleteUser() {
        store.set('user', null)
    }
}

export default new UserController();

