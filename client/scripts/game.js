class Game {
    constructor() {
        this.roomID = 0
        this.players = []
    }

    start() {

    }

    end() {

    }

    updatePlayerInput(player) {
        
    }

    addPlayer(nickname) {
        this.players.push(nickname)
        display.updatePlayerList(this.players)
    }

    removePlayer(nickname) {
        const playerIndex = this.players.findIndex(client => client == nickname)
        this.players.splice(playerIndex, 1)
        display.updatePlayerList(this.players)
    }
}