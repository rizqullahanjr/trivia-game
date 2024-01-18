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
        } else if(msg === "get score") {
            console.log("send score")
            callback(rooms.getResult())
        } else {
            console.log("get answer id : ", msg.id)
            console.log("get answer index : ", msg.quizIndex)
            console.log("get answer answer: ", msg.answer)
            rooms.getAnswer(msg)
        }
    })
}