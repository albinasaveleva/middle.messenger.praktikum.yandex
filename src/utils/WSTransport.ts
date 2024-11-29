import { BASE_WS_URL } from "../api/base-api";
import store from "../store";
import EventBus from "./event-bus";

export enum WSTransportEvents {
    Connected = "connected",
    Error = "error",
    Message = "message",
    Close = "close",
  }


export class WSTransport extends EventBus {
    socket: WebSocket | null = null;
    pingInterval: ReturnType<typeof setInterval> | null = null;
    pingIntervalTime = 30000;
    endpoint?: string;


    setEndpoint(endpoint: string) {
        this.endpoint = endpoint;
    }

    send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Socket is not connected');
        }

        try {
            this.socket.send(JSON.stringify(data))
        } catch (e) {
            console.log(e)
        }
    }

    getStatus() {
        return this.socket;
    }

    connect(endpoint: string): Promise<void> {
        this.socket = new WebSocket(`${BASE_WS_URL}/${endpoint}`);
        this.subscribe(this.socket);
        this.setupPing();
        store.set('socketReadyState', this.socket.readyState);

        return new Promise((resolve, reject) => {
            this.on(WSTransportEvents.Error, reject);
            this.on(WSTransportEvents.Connected, () => {
                this.off(WSTransportEvents.Error, reject);
                resolve();
            })
        });
    }
    close() {
        this.socket?.close();
    }

    setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({type: 'ping'})
        }, this.pingIntervalTime);

        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval as any);
            this.pingInterval = null;
        })
    }

    subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WSTransportEvents.Connected);
            store.set('socketReadyState', this.socket?.readyState);
        });

        socket.addEventListener('close', () => {
            this.emit(WSTransportEvents.Close);
            this.socket = null;
        });

        socket.addEventListener('error', (event) => {
            this.emit(WSTransportEvents.Error, event)
        });

        socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data);
                if (['pong', 'ping', 'user connected'].includes(data?.type)) {
                    return;
                }

                if (Array.isArray(data)) {
                    this.emit(WSTransportEvents.Message, data);
                    store.set('currentChat', {
                        messages: data
                    });
                } else if (typeof data.content === 'string') {
                    this.emit(WSTransportEvents.Message, data);
                    const oldMessages = store.getState().currentChat?.messages || [];
                    store.set('currentChat', {
                        messages: [ data, ...oldMessages ]
                    });
                }
            } catch (e) {

            }
        });
    }
}
