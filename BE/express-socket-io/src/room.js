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
                this.player0Answer[obj.quizNumber] = obj.answer
                break;
            case this.players[1].id:
                this.player0Answer[obj.quizNumber] = obj.answer
                break;
            case this.players[2].id:
                this.player0Answer[obj.quizNumber] = obj.answer
                break;
        }
    }





}

export default room;