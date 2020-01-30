class Input {
    constructor(sendInput) {
        this.xAxis = 0
        this.yAxis = 0
        this.isJoystickDown = false
        this.sendInput = sendInput
    }

    handleJoyStickDown(e) {
        this.isJoystickDown = true
        this.xAxis = (e.pageX - window.innerWidth / 2) / 150
        this.yAxis = (e.pageY - 350) / 150
        this.sendInput()
        $("#joystick-dial").css({
            display: "block",
            top: e.pageY,
            left: e.pageX
        })
    }

    handleJoyStickUp(e) {
        this.isJoystickDown = false
        this.xAxis = 0
        this.yAxis = 0
        this.sendInput()
        $("#joystick-dial").css("display", "none")
    }

    handleJoyStick(e) {
        if (this.isJoystickDown) {
            this.xAxis = (e.pageX - window.innerWidth / 2) / 150
            this.yAxis = (350 - e.pageY) / 150
            if (this.xAxis > 1) {
                this.xAxis = 1
            } else if (this.xAxis < -1) {
                this.xAxis = -1
            }
            if (this.yAxis > 1) {
                this.yAxis = 1
            } else if (this.yAxis < -1) {
                this.yAxis = -1
            }
            this.sendInput()
            $("#joystick-dial").css({
                top: e.pageY,
                left: e.pageX
            })
        }
    }
}