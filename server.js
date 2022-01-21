const express = require('express')

const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3110

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
 
    console.log(socket.id);
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
 
    // socket.on("private_message", (anotherSocketId, msg) => {
    //   socket.to(anotherSocketId).emit("private_message", socket.id, msg);
    // });
})
/*
io.on("connection", socket => {
    console.log('Connected...')
 
    console.log(socket.id);
    socket.on("private message", (anotherSocketId, msg) => {
      socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
  });*/
  