import BaseAPI, { AUTH_USER_ENDPOINT, USER_UPDATE_AVATAR_ENDPOINT, USER_UPDATE_PROFILE_ENDPOINT, USER_UPDATE_PASSWORD_ENDPOINT } from "./base-api";

class UserApi extends BaseAPI {
    async getUser() {
        return this.transport.get(AUTH_USER_ENDPOINT);
    }
    async updateAvatar(data: FormData) {
        return this.transport.put(USER_UPDATE_AVATAR_ENDPOINT, {data});
    }

    async updateProfile(data: {[key: string]: string}) {
        return this.transport.put(USER_UPDATE_PROFILE_ENDPOINT, {data});
    }

    updatePassword(data: {[key: string]: string}) {
        return this.transport.put(USER_UPDATE_PASSWORD_ENDPOINT, {data});
    }
}

export default new UserApi();
