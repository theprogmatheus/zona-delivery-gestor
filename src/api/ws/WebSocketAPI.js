import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketAPI {

    constructor(api) {
        this.api = api;
        this.client = Stomp.over(() => new SockJS(`${this.api.url}/ws`));
        this.client.reconnectDelay = 5000;
        this.client.onWebSocketClose = this.handleDisconnect.bind(this);
        this.client.debug = () => { }
        this.subscribes = [];
        this.connected = false;
    }

    subscribe(destination, callback) {
        this.subscribes.push({
            destination,
            callback
        })
    }

    connect() {
        this.client.connect({}, this.handleConnect.bind(this), this.handleError.bind(this))
    }

    disconnect() {
        this.client.disconnect();
    }

    handleConnect() {
        this.subscribes.forEach(subscribe =>
            this.client.subscribe(subscribe.destination, subscribe.callback))

        this.connected = true;

        console.log("WebSocket connected.")

        if (this.onConnect)
            this.onConnect(this);
    }

    handleError(err) {
        console.log("WebSocket error.", err)

        if (this.onError)
            this.onError(err);
    }

    handleDisconnect() {
        this.connected = false;
        console.log("WebSocket disconnected.")
        if (this.onDisconnect)
            this.onDisconnect(this);
    }

}

export default WebSocketAPI;