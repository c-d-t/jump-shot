const MAX_USERS_IN_ROOM = 4
const ROOM_ID_LENGTH = 8

let rooms = []

module.exports = {
    createRoom,
    joinRoom,
    leaveRoom,
    deleteRoom,
    getRooms
}

function getRooms() {
    return rooms
}

function createRoom() {
    const id = Math.floor(Math.random() * 100000000)
    
    const newRoom = {
        id : id,
        inGame : false,
        joined : []
    }

    rooms.push(newRoom)

    return id
}

function joinRoom({nickname, roomID}) {
    const foundRoom = rooms.find(room => roomID == room.id)

    if (!nickname) {
        throw new Error("Nickname is required")
    }

    if (!foundRoom) {
        throw new Error("Room ID doesn't exist")
    }

    if (foundRoom.inGame) {
        throw new Error("Room is already in a game")
    }

    if (foundRoom.joined.length >= MAX_USERS_IN_ROOM) {
        throw new Error("Room is full")
    }

    foundRoom.joined.push(nickname)
}

function leaveRoom({nickname, roomID}) {
    const foundRoom = rooms.find(room => roomID == room.id)

    if (!foundRoom) {
        throw new Error("Room ID doesn't exist")
    }

    if (!foundRoom.joined.includes(nickname)) {
        throw new Error("You need to be in the room to leave it")
    }

    const clientIndex = foundRoom.joined.findIndex(client => client == nickname)
    foundRoom.joined.splice(clientIndex, 1)
}

function deleteRoom(roomID) {
    const foundRoom = rooms.find(room => roomID == room.id)

    if (!foundRoom) {
        throw new Error("Room ID doesn't exist")
    }

    const roomIndex = rooms.findIndex(room => room.id == roomID)
    rooms.splice(roomIndex, 1)
}