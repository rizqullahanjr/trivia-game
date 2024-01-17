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





}

export default room;