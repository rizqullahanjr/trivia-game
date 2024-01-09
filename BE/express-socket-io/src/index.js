import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, { /* option */ });

io.on("connection", (socket) => {
    // ...
})

httpServer.listen(3000);