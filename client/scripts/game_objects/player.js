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
        this.velocityY -= 5

        this.velocityX += this.velocityX
        this.y += this.velocityY
        if (this.y <= 32) {
            this.y = 32
            this.velocityY = 0
        }
        if (this.x > 992) {
            this.x = 992
            this.velocityX = 0
        } else if (this.x < 0) {
            this.x = 0
            this.velocityX = 0
        }
    }

    input(input) {
        if (input.left) {
            this.x -= 8
        }
        if (input.right) {
            this.x += 8
        }
        if (input.jump && this.y <= 45) {
            this.jump()
        }
    }

    jump() {
        this.velocityY = 50
    }

    shoot() {}
}