import { io } from "socket.io-client";

const socket = io("http://192.168.18.174:7000/");

export default socket;

// socket.emit("leave", ${player.id})
// socket.disconnect()
// socket.connect()
