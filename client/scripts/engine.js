class Engine {
    constructor(framesPerSecond, init, update, render) {
        this.animationRequest = null
        this.lastTime = 0
        this.timeOverflow = 0
        this.timeBetweenFrames = 1000 / framesPerSecond
        this.didUpdate = false
        this.init = init
        this.update = update
        this.render = render
    }

    start() {
        this.animationRequest = requestAnimationFrame(timestamp => {
            this.lastTime = timestamp
            this.init()
            this.loop(timestamp)
        })
    }

    stop() {
        cancelAnimationFrame(this.animationRequest)
    }

    loop(timestamp) {
        const offset = timestamp - this.lastTime
        this.lastTime = timestamp
        this.timeOverflow += offset

        while (this.timeOverflow > this.timeBetweenFrames) {
            this.update()
            this.timeOverflow -= this.timeBetweenFrames
            this.didUpdate = true
        }

        if (this.didUpdate) {
            this.render()
            this.didUpdate = false
        }

        // request next frame
        this.animationRequest = requestAnimationFrame(timestamp => this.loop(timestamp))
    }
}