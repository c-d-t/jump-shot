class Game {
    constructor() {
        this.roomID = 0
        this.players = []
    }

    update(clientInputs) {
        this.players.forEach(player => {
            const clientInput = clientInputs.find(client => client.nickname == player.nickname)
            if (clientInput != undefined) {
                player.input(clientInput.input)
            }

            player.update()
            console.log(player.y)
        })
    }

    addPlayer(nickname) {
        const newPlayer = new Player(nickname)
        this.players.push(newPlayer)
    }

    removePlayer(nickname) {
        const playerIndex = this.players.findIndex(player => player.nickname == nickname)
        this.players.splice(playerIndex, 1)
    }
}