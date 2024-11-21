import { BASE_WS_URL } from "../api/base-api";
import EventBus from "./event-bus";

export enum WSTransportEvents {
    Connected = "connected",
    Error = "error",
    Message = "message",
    Close = "close",
  }


export class WSTransport extends EventBus {
    socket?: WebSocket;
    pingInterval?: ReturnType<typeof setInterval>;
    pingIntervalTime = 30000;
    endpoint?: string;


    setEndpoint(endpoint: string) {
        this.endpoint = endpoint;
    }

    send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Socket is not connected');
        }

        this.socket.send(JSON.stringify({
            content: data,
            type: "message"
        }))
    }
    connect(): Promise<void> {
        if (this.socket) {
            throw new Error('The socket is already connected');
        }

        this.socket = new WebSocket(`${BASE_WS_URL}/${this.endpoint}`);
        this.subscribe(this.socket);
        this.setupPing();

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
        clearInterval(this.pingInterval);
    }

    setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({type: 'ping'})
        }, this.pingIntervalTime);

        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval);
            this.pingInterval = undefined;
        })
    }

    subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WSTransportEvents.Connected);
        });

        socket.addEventListener('close', () => {
            this.emit(WSTransportEvents.Close);
        });

        socket.addEventListener('error', (event) => {
            this.emit(WSTransportEvents.Error, event)
        });

        socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data);
                if (['pong', 'user connected'].includes(data?.type)) {
                    return;
                }
                this.emit(WSTransportEvents.Message, data);

            } catch (e) {

            }
        });
    }
}
