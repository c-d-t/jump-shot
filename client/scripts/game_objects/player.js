class Player {
    constructor(nickname) {
        this.nickname = nickname
        this.color
        this.velocity_x = 0
        this.velocity_y = 0
        this.x = 0
        this.y = 0
        this.grounded = false
    }

    update() {

    }

    input(input) {
        this.x += input.x * 5
        this.y += input.y * 5
    }

    jump() {

    }

    shoot() {}
}