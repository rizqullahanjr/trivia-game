import room from "./room.js"
import getRandomId from "../libs/uuid.js"
import quizRoomFunc from "./quizroomfunc.js";
import axios from "axios";

export default async function socket(io) {
    let rooms = new room();
    let roomId = getRandomId()
    let quiz = await axios.get("http://192.168.18.174:5000/api/v1/get-question")

    // Socket.IO connection handling
    io.on('connection', (socket) => {
        console.log('A user connected');


        // Handle events from the client
        socket.on('room', async (msg) => {
            console.log('Message from client:', msg);

            if(!rooms.isFull()) {
                rooms.addPlayer(msg)
                socket.join(roomId)
                socket.emit('rooms', rooms.getPlayers())
                socket.broadcast.emit('rooms', rooms.getPlayers())
                quizRoomFunc(io, socket, roomId, rooms, quiz.data)
            }

            if(rooms.isFull()) {

                socket.emit('rooms', {
                    message: "room is full",
                    roomId: roomId
                })
                socket.broadcast.emit('rooms', {
                    message: "room is full",
                    roomId: roomId
                })
                console.log(rooms.getPlayers())

                rooms = new room()
                roomId = getRandomId()
                quiz = await axios.get("http://192.168.18.174:5000/api/v1/get-question")
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}