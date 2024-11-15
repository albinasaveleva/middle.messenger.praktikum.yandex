import BaseAPI, { AUTH_USER_ENDPOINT, USER_UPDATE_AVATAR_ENDPOINT, USER_UPDATE_PROFILE_ENDPOINT } from "./base-api";

class UserApi extends BaseAPI {
    async getUser() {
        return this.transport.get(AUTH_USER_ENDPOINT);
    }
    updateAvatar(options) {
        return this.transport.put(USER_UPDATE_AVATAR_ENDPOINT, options);
    }

    updateProfile(options) {
        return this.transport.put(USER_UPDATE_PROFILE_ENDPOINT, options);
    }

    updatePassword(options) {
        return this.transport.put(USER_UPDATE_PASSWORD_ENDPOINT, options);
    }
}

export default new UserApi();
