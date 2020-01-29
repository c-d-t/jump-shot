let express = require('express')
let cors = require('cors')
let socketIO = require('socket.io')

let app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + "/client"))

app.use('/', require('./src/server.router'))

let server = app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})

let io = socketIO(server)
require('./src/server.socket').initSockets(io)