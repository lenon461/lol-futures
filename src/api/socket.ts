import SC from "socket.io-client"

class Socket {

    public socket: any;


    init() {
        const host = "ws://127.0.0.1:8090"
        this.socket = SC.io(host)
        this.socket.on("events", (message: any) => {
            console.log(message)
        })
    }

    emit() {
        this.socket.emit("@test", {test: 1})
    }
    
}

const socket = new Socket()

export default socket