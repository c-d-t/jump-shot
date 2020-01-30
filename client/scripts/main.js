/**
 * This is main file for Jump Shot
 * 
 * It holds all the data about the state of the application
 * and is what connects all the different objects
 * 
 * @author Casey Tai 01/19/2020
 */
$(document).ready(() => {

    "use strict"

    const socket = io()
    let clientRoomID = 0
    let clientNickname = ''

    let hostRoomID = 0
    let playerInputs = []

    /*************/
    /** OBJECTS **/

    // host
    const game = new Game()
    const engine = new Engine(30, init, update, render)
    const renderer = new Renderer()
    const input = new Input(sendInput)


    /***************/
    /** FUNCTIONS **/

    /**
     * This is where all the components interact with each other
     * It will be the function the engine will be calling
     * for every step
     */
    function init() {
        renderer.start()
    }

    function update() {
        game.update(playerInputs)
    }

    function render() {
        renderer.drawBackground()
        game.players.forEach(player => {
            renderer.drawSquare(player.x, player.y, 40, player.color)
        })
    }

    function sendInput() {
        socket.emit("sendInput", {
            x: input.xAxis,
            y: input.yAxis
        })
    }

    function addController() {
        $(document).on("touchstart", "#joystick-container", e => input.handleJoyStickDown(e))
        $(document).on("touchend", "#joystick-container",   e => input.handleJoyStickUp(e))
        $(document).on("touchmove", "#joystick-container",  e => input.handleJoyStick(e))
        $(document).on("mousedown", "#joystick-container",  e => input.handleJoyStickDown(e))
        $(document).on("mouseup", "#joystick-container",    e => input.handleJoyStickUp(e))
        $(document).on("mousemove", "#joystick-container",  e => input.handleJoyStick(e))
    }

    function removeController() {
        $(document).off("touchstart", e => input.handleJoyStickDown(e))
        $(document).off("touchend",   e => input.handleJoyStickUp(e))
        $(document).off("touchmove",  e => input.handleJoyStick(e))
        $(document).off("mousedown",  e => input.handleJoyStickDown(e))
        $(document).off("mouseup",    e => input.handleJoyStickUp(e))
        $(document).off("mousemove",  e => input.handleJoyStick(e))
    }


    /*******************/
    /** PAGE HANDLING **/

    function onMainMenu() {
        display.switchScreen($("#main-menu-template"))
    }

    function onHostGame() {
        $.ajax({
            type: "POST",
            url: "/createRoom",
            dataType: "json",
            success: function (response) {
                display.switchScreen($("#host-lobby-screen-template"))
                display.updatePlayerList([])
                hostRoomID = response.roomID
                $("#room-code").html("ID: " + response.roomID)
                socket.emit("hostConnect", response.roomID)
                socket.on("clientJoined", nickname => {
                    game.addPlayer(nickname)
                    display.updatePlayerList(game.players)
                })
                socket.on("clientLeft", nickname => {
                    game.removePlayer(nickname)
                    display.updatePlayerList(game.players)
                })
                socket.on("receiveInput", input => {
                    playerInputs = input
                })
            },
            error: function (error) {
                display.errorMessage(error.responseJSON.message)
            }
        })
    }

    function joinRoomButtonClick() {
        display.switchScreen($("#join-room-template"))
        $("#nickname-input").focus()
    }

    function onJoinRoom() {
        const nickname = $("#nickname-input").val()
        const roomID = $("#room-id-input").val()
        const data = { roomID, nickname }
        $.ajax({
            type: "POST",
            url: "/joinRoom",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                clientRoomID = roomID
                clientNickname = nickname
                addController()
                display.switchScreen($("#controller-template"))
                socket.emit("joinRoom", {roomID, nickname})
            },
            error: function (error) {
                display.errorMessage(error.responseJSON.message)
            }
        })
    }

    function onStartGame() {
        if (game.players.length >= 1) {
            display.switchScreen($("#host-game-screen-template"))
            engine.start()    
        } else {
            display.errorMessage("You need at least 1 player")
        }
    }

    function onLeaveGame() {

    }

    function onLeaveController() {
        const data = { roomID: clientRoomID, nickname: clientNickname }
        $.ajax({
            type: "POST",
            url: "/leaveRoom",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                removeController()
                display.switchScreen($("#main-menu-template"))
                socket.emit("leaveRoom")
            },
            error: function (error) {
                display.errorMessage(error.responseJSON.message)
            }
        })
    }

    function onLeaveHost() {
        const data = {roomID: hostRoomID}
        $.ajax({
            type: "DELETE",
            url: "/deleteRoom",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                display.switchScreen($("#main-menu-template"))
            },
            error: function (error) {
                display.errorMessage(error.responseJSON.message)
            }
        })
    }


    /****************/
    /** INITIALIZE **/

    $(document).on("click", "#main-menu-button",       onMainMenu         )
    $(document).on("click", "#host-room-button",       onHostGame         )
    $(document).on("click", "#join-room-button",       joinRoomButtonClick)
    $(document).on("click", "#join-button",            onJoinRoom         )
    $(document).on("click", "#exit-controller-button", onLeaveController  )
    $(document).on("click", "#exit-host-button",       onLeaveHost        )
    $(document).on("click", "#start-game-button",      onStartGame        )

    onMainMenu()
})