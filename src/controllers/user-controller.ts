import UserApi from "../api/user-api";
import store from "../store";

class UserController {
    async getUser() {
        await UserApi.getUser()
            .then(({response}) => store.set('user', response))
            .catch(({reason}) => console.log(reason))
    }
    deleteUser() {
        store.set('user', null)
    }
    updateAvatar(options) {
        UserApi.updateAvatar(options)
    }
    updateProfile(options) {
        UserApi.updateProfile(options)
    }
    updatePassword(options) {
        UserApi.updatePassword(options)
    }
}

export default new UserController();

