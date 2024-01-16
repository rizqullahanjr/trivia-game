import axios from "axios";

class quizRoom {

    constructor(socket) {
        this.socket = socket
    }

    async quizRoom(roomId) {
        const quiz = await axios.get("http://192.168.18.174:5000/api/v1/get-question")

        this.socket.to(roomId).emit('questions', quiz)
    }
}

export default quizRoom
