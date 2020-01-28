const display = {

    switchScreen($template) {
        $("#app").html($template.html())
    },

    updatePlayerList: playerList => {
        if (playerList.length == 0) {

            $("#player-list").html("No One Is Here ):")

        } else {

            $("#player-list").html("")
            for (let i = 0; i < playerList.length; i++) {
                const playerHTML = document.createElement("li")
                playerHTML.innerHTML =  playerList[i]
                $("#player-list").append(playerHTML)
            }

        }
    },

    errorMessage: error => {
        $("#error-message").html(error)
        $("#error-message").css("display", "block")
        $("#error-message").fadeOut(3000)
    }
}