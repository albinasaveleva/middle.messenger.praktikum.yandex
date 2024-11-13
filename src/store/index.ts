import EventBus from "../utils/event-bus";
import { set } from "../utils/utils";

export enum StoreEvents {
    Updated = 'updated',
}

type TState = {
    user: {
        avatar: null | string,
        display_name: null | string,
        email: string,
        first_name: string,
        id: number,
        login: string,
        phone: string,
        second_name: string
    } | null,
    authorization: boolean
};

class Store extends EventBus {
    private state: TState = {
        user: null,
        authorization: false
    };

    public getState() {
      return this.state;
    }

    public set(path: string, value: unknown) {
      set(this.state, path, value);
      this.emit(StoreEvents.Updated);
    };
}

export default new Store();
