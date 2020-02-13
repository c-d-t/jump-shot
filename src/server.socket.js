const { leaveRoom, sendInput, getRooms, deleteRoom } = require("./rooms")

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
            socket.in(data.roomID).emit("clientJoined", socket.nickname)
        })
        
        socket.on("leaveRoom", () => {
            try {
                socket.leave(socket.roomID)
                socket.in(socket.roomID).emit("clientLeft", socket.nickname)    
            }
            catch(error) {
                console.log(error)
            }
        })

        socket.on("sendInput", input => {
            try {
                sendInput(socket.roomID, socket.nickname, input)
            }
            catch(error) {
                console.log(error.message)
            }
        })

        socket.on("disconnect", () => {
            if (!socket.roomID) {
                return
            }
            try {
                if (!socket.nickname) {
                    deleteRoom(socket.roomID)
                } else {
                    leaveRoom({nickname: socket.nickname, roomID: socket.roomID})
                    socket.in(socket.roomID).emit("clientLeft", socket.nickname)      
                }
            }
            catch(error) {
                console.log(error.message)
            }
        })
    })

    setInterval(() => {
        const rooms = getRooms()
        if (rooms.length == 0) {
            return
        }
        for (let i = 0; i < rooms.length; i++) {
            io.in(rooms[i].id).emit("receiveInput", rooms[i].clients)
        }
    }, 50);
}