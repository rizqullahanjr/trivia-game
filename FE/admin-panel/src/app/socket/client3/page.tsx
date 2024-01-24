'use client'

import { useEffect } from "react"
import useClient3 from "./useClient3"
import socket from "@/libs/socket"
import { io } from "socket.io-client"

export default function Client3() {
    const { join, seeRoom, getQuiz, getAnswer, getAnswers, sendAnswers, getResult } =  useClient3()
    const quiz = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    useEffect(() => {
        seeRoom()
        getQuiz()
        getAnswers()
    }, [])


    return (
        <div>
            <div>

            </div>
            <div>
                <button
                    type="button"
                    onClick={join}
                    className={"rounded-3xl bg-red-500 text-gray-900 font-bold px-3 py-1"}
                >Join</button>
            </div>
            <div className={"grid grid-cols-1 gap-2 m-2"}>
                {
                    quiz.map((num) => (
                        <div key={num} className={"flex flex-row"}>
                            <p>{num + 1}</p>
                            <button
                                type="button"
                                onClick={() => getAnswer(num, "Benar")}
                                className={"rounded-3xl bg-red-500 text-gray-900 font-bold px-3 py-1"}
                            >True</button>
                            <button
                                type="button"
                                onClick={() => getAnswer(num, "Salah")}
                                className={"rounded-3xl bg-red-500 text-gray-900 font-bold px-3 py-1"}
                            >False</button>
                            <button
                                type="button"
                                onClick={() => sendAnswers(num)}
                                className={"rounded-3xl bg-red-500 text-gray-900 font-bold px-3 py-1"}
                            >Send</button>
                        </div>
                    ))
                }
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => getResult()}
                    className={"rounded-3xl bg-red-500 text-gray-900 font-bold px-3 py-1"}
                >Result</button>
            </div>
        </div>
    )
}