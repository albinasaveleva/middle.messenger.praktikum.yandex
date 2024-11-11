import BaseAPI, { AUTH_USER_ENDPOINT } from "./base-api";

class UserApi extends BaseAPI {
    getUser() {
        return this.transport.get(AUTH_USER_ENDPOINT);
    }
    updateAvatar() {

    }

    updateProfile() {

    }

    updatePassword() {

    }
}

export default new UserApi();
