class Renderer {
    constructor(imageSource) {
        this.mapCols = 16
        this.tilesheet = new Image()
        this.tilesheetCols = 8
        this.tilesheetSize = 16
        this.gameTileSize = 64
        this.tilesheet.src = '../img/jumpshot-tilesheet.png'
    }
    
    start() {
        this.canvas = document.getElementById("game-canvas")
        this.context = this.canvas.getContext('2d')
        this.canvas.width = 1024
        this.canvas.height = 512
        this.context.imageSmoothingEnabled = false;
    }

    drawMap(map) {
        map.forEach((value, index) => {
            const imgX = (value % this.tilesheetCols) * this.tilesheetSize
            const imgY = Math.floor(value / this.tilesheetCols) * this.tilesheetSize
            const drawX = (index % this.mapCols) * this.gameTileSize
            const drawY = Math.floor(index / this.mapCols) * this.gameTileSize
            this.context.drawImage(
                this.tilesheet, 
                imgX, imgY, this.tilesheetSize, this.tilesheetSize,
                drawX, drawY, this.gameTileSize,  this.gameTileSize
            )
        })
    }

    drawSquare(x, y, width, color) {
        this.context.fillStyle = color;
        this.context.fillRect(Math.round(x), this.canvas.height - Math.round(y), width, width)
    }
}