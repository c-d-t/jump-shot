let express = require('express')
let socketIO = require('socket.io')

let app = express()
const PORT = 3000 || process.env.PORT

app.use(express.json())
app.use(express.static(__dirname + "/client"))

app.use('/', require('./src/server.router'))

let server = app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})

let io = socketIO(server)
require('./src/server.socket').initSockets(io)