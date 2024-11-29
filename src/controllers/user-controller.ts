import UserApi from "../api/user-api";
import store from "../store";

class UserController {
    async getUser() {
        return await UserApi.getUser()
            .then(({response}) =>{
                store.set('user', response);
                return response;
            })
            .catch(({reason}) => {
                console.log(reason);
                return null;
            })
    }
    deleteUser() {
        store.set('user', null);
    }
    async getAvatar(src: string) {
        await UserApi.getAvatar(src)
            .then((response) => console.log(response.responseURL))
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
    async searchUser(data: {[key: string]: string}) {
        return await UserApi.searchUser(data)
            .then(({response}) => response )
    }
}

export default new UserController();

