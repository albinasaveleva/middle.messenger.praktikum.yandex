import { TState } from "../types/data";
import EventBus from "../utils/event-bus";
import { set } from "../utils/utils";

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: TState = {
        user: null,
        chatList: [],
        currentChat: null,
        socketReadyState: null
    };

    public getState() {
        return this.state;
    }

    public cleanState() {
        this.state = {
            user: null,
            chatList: [],
            currentChat: null,
            socketReadyState: null
        };
        this.emit(StoreEvents.Updated);
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
        console.log(this.state)
        return this;
    };
}

export default new Store();
