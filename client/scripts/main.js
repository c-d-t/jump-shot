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
    let role = -1 // 0 = host, 1 = client

    /*************/
    /** OBJECTS **/

    // host
    const game = new Game()
    const engine = new Engine()

    // client
    const input = new Input()


    /***************/
    /** FUNCTIONS **/

    /**
     * This is where all the components interact with each other
     * It will be the function the engine will be calling
     * for every step
     */
    function gameUpdate() {

    }


    /********************/
    /** EVENT HANDLING **/

    function onMainMenu() {
        $("#app").html($("#main-menu-template").html())
    }

    function onHostGame() {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/createRoom",
            dataType: "json",
            success: function (response) {
                $("#app").html($("#host-lobby-screen-template").html())
                $("#room-code").html("ID: " + response.roomID)
                socket.emit("hostConnect", response.roomID)
            },
            error: function (error) {
                display.errorMessage(error.responseJSON.message)
            }
        })
    }

    function joinRoomButtonClick() {
        $("#app").html($("#join-room-template").html())
        $("#nickname-input").focus()
    }

    function onJoinRoom() {
        const nickname = $("#nickname-input").val()
        const roomID = $("#room-id-input").val()
        const data = { roomID, nickname }
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/joinRoom",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                $("#app").html($("#controller-template").html())
                socket.emit("joinRoom", {roomID, nickname})
            },
            error: function (error) {
                display.errorMessage(error.responseJSON.message)
            }
        })
    }

    function onLeaveGame() {

    }


    /****************/
    /** INITIALIZE **/

    $(document).on("click", "#main-menu-button", onMainMenu         )
    $(document).on("click", "#host-room-button", onHostGame         )
    $(document).on("click", "#join-room-button", joinRoomButtonClick)
    $(document).on("click", "#join-button",      onJoinRoom         )

    onMainMenu()
    $("#app").html($("#controller-template").html())

    
    /*************/
    /** SOCKETS **/

    socket.on("clientJoined", nickname => {
        game.addPlayer(nickname)
    })

    socket.on("clientLeft", data => {

    })
})