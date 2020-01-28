class Input {
    constructor() {
        this.xAxis = 0
        this.button = new ButtonInput()
    }

    handleKeyInput(event) {
        const keyCode = event.keyCode || event.which
        const down = (event.type == "keydown")

        switch(keyCode) {
            case 37: 
                this.xAxis = -1
                break
            case 39:
                this.xAxis = 1
                break
            case 40:
                this.button.set(down)
        }
    }

    handleJoyStick() {

    }

    handleJumpButton() {

    }

    handleShootButton() {
        
    }
}

class ButtonInput {
    constructor() {
        this.active = false
        this.down = false
    }

    set(down) {
        // makes it so active is only true once every key press
        if (this.down != down) this.active = down
        this.down = down
    }
}