import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import room from "./room.js"
import getRandomId from "./uuid.js";
import quizRoom from "./quiz-room.js";
import quizRoomFunc from "./quizroomfunc.js";

const app = express();
const server = http.createServer(app);
const io =
    new Server(server, {
        cors: {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        }
    });
const PORT =  7000;

// Your Express.js routes and middleware can be added here
let rooms = new room();
let roomId = getRandomId()

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');


    // Handle events from the client
    socket.on('room', (msg) => {
        console.log('Message from client:', msg);


        if(!rooms.isFull()) {
            rooms.addPlayer(msg)
            socket.join(roomId)
            socket.emit('rooms', rooms.getPlayers())
            socket.broadcast.emit('rooms', rooms.getPlayers())
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
            quizRoomFunc(socket, roomId, rooms)
            rooms = new room()
            roomId = getRandomId()


        }





        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT,'192.168.18.174', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});