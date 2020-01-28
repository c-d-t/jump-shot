class Game {
    constructor() {
        this.roomID = 0
        this.players = []
    }

    start() {

    }

    end() {

    }

    addPlayer(nickname) {
        this.players.push(nickname)
        display.updatePlayerList(this.players)
    }

    removePlayer() {

    }
}