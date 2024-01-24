import axios from "axios";

export default async function quizRoomFunc(io, socket, roomId, rooms, quiz) {

    io.to(roomId).emit('questions', quiz)
    rooms.getQuizAnswer(quiz)
    console.log("roomId: ", roomId)

    socket.on(roomId, (msg, callback) => { // msg = { id: id, quizIndex: num, answer: answer
        console.log("message: " + msg)
        if (msg >=0 && msg <=9 ) {
            console.log("send callback")
            callback(rooms.getQuestionAnswer(msg))
        } else if(msg.message === "get score") {
            console.log("send score")
            callback(rooms.getResult(msg.id))
        } else {
            console.log("get answer id : ", msg.id)
            console.log("get answer index : ", msg.quizIndex)
            console.log("get answer answer: ", msg.answer)
            rooms.getAnswer(msg)
            socket.emit(`${roomId} answer`, rooms.getQuestionAnswer(msg.quizIndex))
            socket.broadcast.emit(`${roomId} answer`, rooms.getQuestionAnswer(msg.quizIndex))
        }
    })

    socket.on("leave", (msg) => {
        socket.leave(roomId)
        rooms.leave(msg)
        socket.emit('rooms', rooms.getPlayers())
        socket.broadcast.emit('rooms', rooms.getPlayers())
    })
}