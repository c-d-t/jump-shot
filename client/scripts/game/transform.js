class Transform {
    constructor(x, y, width, height) {
        this.width  = width
        this.height = height
        this.x = x
        this.y = y
        this.old_x = x
        this.old_y = y
    }

    get position() {
        return {x, y}
    }

    move({x, y}) {
        this.old_x = this.x
        this.old_y = this.y
        this.x = x
        this.y = y
    }

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