import axios from "axios";

export default async function quizRoomFunc(socket, roomId, rooms) {
    const quiz = await axios.get("http://192.168.18.174:5000/api/v1/get-question")

    socket.to(roomId).emit('questions', quiz.data)
    socket.to(roomId).broadcast.emit('questions', quiz.data)
    rooms.getQuizAnswer(quiz.data)

    socket.on(roomId, (msg) => { // msg = { id: id, quizNumber: num, answer: answer
        rooms.getAnswer(msg)
        console.log(msg)
    })
}