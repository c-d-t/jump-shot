const { createRoom, joinRoom, leaveRoom } = require("./rooms")

exports.initSockets = io => {
    io.on("connect", socket => {
        clientSocket = socket

        socket.on("hostConnect", roomID => {
            socket.roomID = roomID
            socket.join(roomID)
        })

        socket.on("joinRoom", data => {
            socket.roomID = data.roomID
            socket.nickname = data.nickname
            socket.in(data.roomID).emit("clientJoined", data.nickname)
        })
        
        socket.on("leaveRoom", data => {
            
        })

        socket.on("sendInput", ({roomID, ...data}) => {
            socket.to(roomID).emit("receiveInput", data)
        })

        socket.on("disconnect", () => {
            if (!socket.roomID) {
                return
            }
            try {
                leaveRoom({nickname: socket.nickname, roomID: socket.roomID})
            }
            catch(error) {
                console.log(error)
            }
        })
    })
}