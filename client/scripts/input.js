class Input {
    constructor() {
        this.buttons = [
            new Button("jump", 10, 10, 120, 120, "#f09000"),
            new Button("left", 150, 10, 120, 120, "#0090f0"),
            new Button("right", 290, 10, 120, 120, "#0090f0")
        ]
    }

    handleInput(target_touches) {
        console.log("hi")
        for (let buttonIndex = 0; buttonIndex < this.buttons.length; buttonIndex++) {
            const button = this.buttons[buttonIndex]
            button.active = false

            for (let touchIndex = 0; touchIndex < target_touches.length; touchIndex++) {
                const touch = target_touches[touchIndex]

                if (button.isPressed({
                    x: touch.clientX,
                    y: touch.clientY
                })) {
                    button.active = true
                    break
                }
            }
        }
    }
}

class Button {
    constructor(name, x, y, width, height, color) {
        this.name = name
        this.active = false
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    isPressed({x, y}) {
        if (x < this.x ||  x > this.x + this.width || y < this.y || y > this.y + this.height) {
            return false
        }

        return true
    }
}