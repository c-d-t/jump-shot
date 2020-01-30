const router = require('express').Router()

const { createRoom, joinRoom, leaveRoom, deleteRoom, getRooms } = require('./rooms')

router.get('/getRooms', (req, res) => {
    const rooms = getRooms()
    res.status(200).json({
        rooms
    })
})

router.post('/createRoom', (req, res) => {
    try {
        const roomID = createRoom()
        res.status(200).json({
            message: "Created room",
            roomID: roomID
        })
    }
    catch(error) {
        res.status(400).json({
            content: error
        })
    }
})

router.post('/joinRoom', (req, res) => {
    try {
        const roomID = parseInt(req.body.roomID)
        joinRoom({
            nickname: req.body.nickname,
            roomID: roomID
        })
        res.status(200).json({
            message: "Joined room"
        })
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.post('/leaveRoom', (req, res) => {
    try {
        const roomID = parseInt(req.body.roomID)
        leaveRoom({
            nickname: req.body.nickname,
            roomID: roomID
        })
        res.status(200).json({
            message: "Left room"
        })
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.delete('/deleteRoom', (req, res) => {
    try {
        const roomID = parseInt(req.body.roomID)
        deleteRoom(roomID)
        res.status(200).json({
            message: "Deleted room"
        })
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = router