import socket from "@/libs/socket";
import { useState } from "react";

interface answer {
    id: number,
    quizIndex: number,
    answer: string
}

export default function useClient3() {
    const [roomsId, setRoomsId] = useState('')

    async function join() {
        await console.log("trying to connect socket io")
         socket.emit("room", {
            id: 24678,
            name:  "erick",
            avatar:  "https://res.cloudinary.com/dfrimbo6q/image/upload/v1704683803/trivia-game-avatar/free-smile-man.png"}, (response: { status: any; }) => {
        });
        
    }

    async function seeRoom() {
        console.log("seeing the room")
        await socket.on("rooms", (msg) => {
            if(msg.message == "room is full") {
                setRoomsId(msg.roomId)
            }
            console.log(msg)
        })
        
    }

    async function getQuiz() {
        console.log("get quiz")
        socket.on('questions', (msg) => {
            console.log(msg)
        })
    }

    function getAnswer(index: number, answer: string) {
        const playerAnswer: answer = {
            id: 24678,
            quizIndex: index,
            answer: answer
        }
        console.log("send answer : ", roomsId)
        socket.emit(roomsId, playerAnswer)
    }


    function getAnswers() {
        console.log("get answers");
        socket.on('answers', (msg) => {
            console.log(msg)
        })
        
    }

    function sendAnswers(index: number) {
        console.log("send answers")
        socket.emit(roomsId, index, (response: any) => {
            console.log(response)
        })
    }

    function getResult() {
        console.log("get result")
        socket.emit(roomsId, "get score", (response: any) => {
            console.log(response)
        })
    }


    return {
        join,
        seeRoom,
        getQuiz,
        getAnswer,
        getAnswers,
        sendAnswers,
        getResult
    }
}