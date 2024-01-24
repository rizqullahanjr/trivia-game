import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import socket from './socket/socket.js';

const app = express();
const PORT =  7000;
const server = http.createServer(app);
const io =
    new Server(server, {
        cors: {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        }
    });

socket(io)

server.listen(PORT,'192.168.18.174', () => {
    console.log(`Server is running on http://192.168.18.174:${PORT}`);
});