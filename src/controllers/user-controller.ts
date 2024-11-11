import UserApi from "../api/user-api";
import store from "../store";

class UserController {
    getUser() {
      UserApi.getUser()
        .then(({response}) => store.set('user', response))
    }
}

export default new UserController();

