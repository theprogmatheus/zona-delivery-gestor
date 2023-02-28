import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketAPI {

    constructor(api) {
        this.api = api;
        this.client = Stomp.over(() => new SockJS(`${this.api.url}/ws`));
        this.client.reconnectDelay = 3000;
        this.client.onWebSocketClose = this.onDisconnect.bind(this);
        this.client.debug = () => { }
        this.subscribes = [];
    }

    subscribe(destination, callback) {
        this.subscribes.push({
            destination,
            callback
        })
    }

    connect() {
        this.client.connect({}, this.onConnect.bind(this), this.onError.bind(this))
    }

    disconnect() {
        this.client.disconnect();
    }



    onConnect() {
        console.log(this.subscribes)
        this.subscribes.forEach(subscribe =>
            this.client.subscribe(subscribe.destination, subscribe.callback))

        console.log('WebSocket conectado!')

        this.connected = true;
    }


    onError() {
        console.log('WebSocket erro!')
    }

    onDisconnect() {
        console.log('WebSocket desconectado!')
        this.connected = false;
    }

}

export default WebSocketAPI;