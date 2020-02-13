class Game {
    constructor() {
        this.mapX = 16
        this.mapY = 8

        this.map = [
            7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,
            27, 7,  27, 7,  27, 7,  27, 7,  27, 7,  27, 7,  27, 7,  27, 7,
            7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,
            7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,
            27, 7,  27, 7,  27, 7,  27, 7,  27, 7,  27, 7,  27, 7,  27, 7,
            7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,
            1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 
            9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 
        ]
        this.collisionMap = [
            "oh", "no"
        ]
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