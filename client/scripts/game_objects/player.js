class Player {
    constructor(nickname) {
        this.nickname = nickname
        this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        this.velocityX = 0
        this.velocityY = 0
        this.x = 0
        this.y = 0
        this.grounded = false
    }

    update() {
        this.velocityX *= 0.8
        this.velocityY -= 1

        this.velocityX += this.velocityX
        this.y += this.velocityY
        if (this.y <= 40) {
            this.y = 40
            this.velocityY = 0
        }
        if (this.x > 1160) {
            this.x = 1160
            this.velocityX = 0
        } else if (this.x < 0) {
            this.x = 0
            this.velocityX = 0
        }
    }

    input(input) {
        this.x += input.x * 5
        if (input.y > 0.6 && this.y <= 45) {
            this.jump()
        }
    }

    jump() {
        this.velocityY = 17
    }

    shoot() {}
}