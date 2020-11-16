import SC from "socket.io-client"

class Socket {

    public socket: WebSocket = new WebSocket('ws://localhost:8090');;


    init() {
        this.socket.onmessage = ((message: any) => {
            console.log(message)
        })
    }

    emit() {
        this.socket.send(JSON.stringify({event: "@test", test: 1}))
    }
    
}

const socket = new Socket()

export default socket