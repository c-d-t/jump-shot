class Player {
    constructor(nickname) {
        this.nickname = nickname
        this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        this.width  = 8
        this.height = 8
        this.x = 0
        this.y = 0
        this.old_x = 0
        this.old_y = 0
        this.velocityX = 0
        this.velocityY = 0
        this.grounded = false
    }

    update() {
        this.velocityX *= 0.7
        this.velocityY += 1

        this.old_x = this.x
        this.old_y = this.y
        this.x += this.velocityX
        this.y += this.velocityY

        if (this.y >= 120) {
            this.grounded = true
            this.y = 120
            this.velocityY = 0
        }
        if (this.x > 248) {
            this.x = 248
            this.velocityX = 0
        } else if (this.x < 0) {
            this.x = 0
            this.velocityX = 0
        }
    }

    input(input) {
        if (input.left) {
            this.velocityX -= 1
        }
        if (input.right) {
            this.velocityX += 1
        }
        if (input.jump && this.grounded) {
            this.jump()
        }
    }

    jump() {
        this.grounded = false
        this.velocityY = -13
    }

    shoot() {}

    getTop() { return this.y }
    getRight() { return this.x + this.width }
    getBottom() { return this.y + this.height }
    getLeft() { return this.x }

    getOldTop() { return this.old_y }
    getOldRight() { return this.old_x + this.width }
    getOldBottom() { return this.old_y + this.height }
    getOldLeft() { return this.old_x }

    setTop(y) { this.y = y }
    setRight(x) { this.y = x - this.width }
    setBottom(y) { this.y = y - this.height }
    setLeft(x) { this.x  = x }
}