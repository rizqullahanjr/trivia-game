import diamondStub from "./proto/grpc.js"

class room {

    constructor() {
        this.players = []
        this.answer = []
        this.playerPoint = []
        this.player0Answer = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.player1Answer = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.player2Answer = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }

    isFull() {
        return this.players.length === 3
    }

    addPlayer(player) {
        this.players.push(player)
    }

    getPlayers() {
        return this.players
    }

    getQuizAnswer(quiz) {
        quiz.forEach( (num) => {
            this.answer.push(num.Answer)
        })
        console.log(this.answer)
    }

    getAnswer(obj) {
        switch (obj.id) {
            case this.players[0].id:
                console.log("insert to id: ", this.players[0].id)
                this.player0Answer[obj.quizIndex] = obj.answer
                console.log("answer :", this.player0Answer[obj.quizIndex])
                break;
            case this.players[1].id:
                console.log("insert to id: ", this.players[1].id)
                this.player1Answer[obj.quizIndex] = obj.answer
                console.log("answer :", this.player1Answer[obj.quizIndex])
                break;
            case this.players[2].id:
                console.log("insert to id: ", this.players[2].id)
                this.player2Answer[obj.quizIndex] = obj.answer
                console.log("answer :", this.player2Answer[obj.quizIndex])
                break;
        }
        return this.isAllAnswered(obj.quizIndex)
    }

    isAllAnswered(index) {
        if(this.player0Answer[index] === index) {
            return false
        }
        if(this.player1Answer[index] === index) {
            return false
        }
        if(this.player2Answer[index] === index) {
            return false
        }
        return true
    }

    getQuestionAnswer(index) {
        return [
            {
                id: this.players[0].id,
                avatar: this.players[0].avatar,
                answer: this.player0Answer[index]
            },
            {
                id: this.players[1].id,
                avatar: this.players[1].avatar,
                answer: this.player1Answer[index]
            },
            {
                id: this.players[2].id,
                avatar: this.players[2].avatar,
                answer: this.player2Answer[index]
            }
        ]
    }

    getResult() {
        const rank = this.getRank();
        console.log("send diamond")
        console.log(rank[0].id)
        diamondStub.add({
            id: rank[0].id,
            diamond: 5
        }, (result) => {
            console.log(result)
        })
        return rank
    }

    getRank() {
        const score1 = this.getPoint(this.player0Answer)
        const score2 = this.getPoint(this.player1Answer)
        const score3 = this.getPoint(this.player2Answer)
        if(score1 >= score2) {
            if(score1 >= score3) {
                if(score2 >= score3) {
                    // score1 > score2 > score3
                    return [
                        {
                            rank: 1,
                            id: this.players[0].id,
                            score: score1,
                            avatar: this.players[0].avatar,
                            name: this.players[0].name
                        },
                        {
                            rank: 2,
                            id: this.players[1].id,
                            score: score2,
                            avatar: this.players[1].avatar,
                            name: this.players[1].name
                        },
                        {
                            rank: 3,
                            id: this.players[2].id,
                            score: score3,
                            avatar: this.players[2].avatar,
                            name: this.players[2].name
                        }
                    ]
                } else {
                    // score1 > score3 > score2
                    return [
                        {
                            rank: 1,
                            id: this.players[0].id,
                            score: score1,
                            avatar: this.players[0].avatar,
                            name: this.players[0].name
                        },
                        {
                            rank: 2,
                            id: this.players[2].id,
                            score: score3,
                            avatar: this.players[2].avatar,
                            name: this.players[2].name
                        },
                        {
                            rank: 3,
                            id: this.players[1].id,
                            score: score2,
                            avatar: this.players[1].avatar,
                            name: this.players[1].name
                        },

                    ]
                }
            } else {
                // score3 > score1 > score2
                return [
                    {
                        rank: 1,
                        id: this.players[2].id,
                        score: score3,
                        avatar: this.players[2].avatar,
                        name: this.players[2].name
                    },
                    {
                        rank: 2,
                        id: this.players[0].id,
                        score: score1,
                        avatar: this.players[0].avatar,
                        name: this.players[0].name
                    },
                    {
                        rank: 3,
                        id: this.players[1].id,
                        score: score2,
                        avatar: this.players[1].avatar,
                        name: this.players[1].name
                    },

                ]
            }
        } else {
            if(score2 >= score3) {
                if(score1 >= score3) {
                    // score2 > score1 > score3
                    return [
                        {
                            rank: 1,
                            id: this.players[1].id,
                            score: score2,
                            avatar: this.players[1].avatar,
                            name: this.players[1].name,
                        },
                        {
                            rank: 2,
                            id: this.players[0].id,
                            score: score1,
                            avatar: this.players[0].avatar,
                            name: this.players[0].name
                        },
                        {
                            rank: 3,
                            id: this.players[2].id,
                            score: score3,
                            avatar: this.players[2].avatar,
                            name: this.players[2].name
                        },
                    ]
                } else {
                    // score2 > score3 > score1
                    return [
                        {
                            rank: 1,
                            id: this.players[1].id,
                            score: score2,
                            avatar: this.players[1].avatar,
                            name: this.players[1].name
                        },
                        {
                            rank: 2,
                            id: this.players[2].id,
                            score: score3,
                            avatar: this.players[2].avatar,
                            name: this.players[2].name
                        },
                        {
                            rank: 3,
                            id: this.players[0].id,
                            score: score1,
                            avatar: this.players[0].avatar,
                            name: this.players[0].name
                        },
                    ]
                }
            } else {
                // score3 > score2 > score1
                return [
                    {
                        rank: 1,
                        id: this.players[2].id,
                        score: score3,
                        avatar: this.players[2].avatar,
                        name: this.players[2].name
                    },
                    {
                        rank: 2,
                        id: this.players[1].id,
                        score: score2,
                        avatar: this.players[1].avatar,
                        name: this.players[1].name
                    },
                    {
                        rank: 3,
                        id: this.players[0].id,
                        score: score1,
                        avatar: this.players[0].avatar,
                        name: this.players[0].name
                    },

                ]
            }
        }
    }

    getPoint(array) {
        let score = 0;
        for(let i=0; i<10; i++) {
            if(this.answer[i] === array[i]) {
                score += 20
            }
        }
        return score;
    }

    leave(id) {
        for(let i=0; i<this.players.length; i++) {
            if(this.players[i].id === id) {
                this.players.splice(i, 1)
            }
        }
    }





}

export default room;