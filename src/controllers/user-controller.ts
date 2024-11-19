import UserApi from "../api/user-api";
import store from "../store";

class UserController {
    async getUser() {
        await UserApi.getUser()
            .then(({response}) => store.set('user', response))
            .catch(({reason}) => console.log(reason))
    }
    deleteUser() {
        store.set('user', null);
    }
    async getAvatar(src: string) {
        await UserApi.getAvatar(src)
            .then((response) => console.log(response))
    }
    async updateAvatar(data: FormData) {
        await UserApi.updateAvatar(data)
            .then(({response}) => store.set('user', response))
            .catch(({reason}) => console.log(reason))
    }
    async updateProfile(data: {[key: string]: string}) {
        await UserApi.updateProfile(data)
            .then(({response}) => store.set('user', response))
            .catch(({reason}) => console.log(reason))
    }
    updatePassword(data: {[key: string]: string}) {
        UserApi.updatePassword(data)
    }
}

export default new UserController();

