const display = {

    switchScreen($template) {
        $("#app").html($template.html())
    },

    updatePlayerList: playerList => {
        if (playerList.length == 0) {

            $("#player-list").html("<li>No One Is Here ):</li>")

        } else {

            $("#player-list").html("")
            for (let i = 0; i < playerList.length; i++) {
                const playerHTML = document.createElement("li")
                playerHTML.innerHTML =  playerList[i].nickname
                $("#player-list").append(playerHTML)
            }

        }
    },

    errorMessage: error => {
        $("#error-message").html(error)
        $("#error-message").css("display", "block")
        $("#error-message").fadeOut(3000)
    },

    showVirtualController: buttons => {
        const canvas = document.getElementById("virtual-controller")
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        buttons.forEach(button => {
            ctx.fillStyle = button.color;
            ctx.fillRect(button.x, button.y, button.width, button.height)
        })
    }
}