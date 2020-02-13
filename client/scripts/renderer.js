class Renderer {
    constructor(imageSource) {
        this.mapCols = 16
        this.tilesheet = new Image()
        this.tilesheetCols = 8
        this.tileSize = 16
        this.tilesheet.src = '../img/jumpshot-tilesheet.png'
    }
    
    start() {
        this.canvas = document.getElementById("game-canvas")
        this.context = this.canvas.getContext('2d')
        this.canvas.width = 256
        this.canvas.height = 128
        this.context.imageSmoothingEnabled = false
    }

    drawMap(map) {
        map.forEach((value, index) => {
            const imgX = (value % this.tilesheetCols) * this.tileSize
            const imgY = Math.floor(value / this.tilesheetCols) * this.tileSize
            const drawX = (index % this.mapCols) * this.tileSize
            const drawY = Math.floor(index / this.mapCols) * this.tileSize
            this.context.drawImage(
                this.tilesheet, 
                imgX, imgY, this.tileSize, this.tileSize,
                drawX, drawY, this.tileSize,  this.tileSize
            )
        })
    }

    drawSquare(x, y, width, color) {
        this.context.fillStyle = color;
        this.context.fillRect(Math.round(x), Math.round(y), width, width)
    }
}