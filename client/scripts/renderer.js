class Renderer {
    start() {
        this.canvas = document.getElementById("game-canvas")
        this.context = this.canvas.getContext('2d')
        this.canvas.width = 1200
        this.canvas.height = 400
    }

    drawBackground() {
        this.context.fillStyle = 'rgb(0,0,0,0.2)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawSquare(x, y, width, color) {
        this.context.fillStyle = color;
        this.context.fillRect(Math.round(x), this.canvas.height - Math.round(y), width, width)
    }
}