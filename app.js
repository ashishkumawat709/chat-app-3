const express = require("express")
const app = express()
const port = process.env.PORT || 7000

const server = require('http').createServer(app)
const io = require("socket.io")(server)

app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname, +  'index.html')
})

io.on("connection", (socket) => {
    console.log('connected');
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })
})

server.listen(port, () => {
    console.log('listening 4000');
})





