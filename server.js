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
var connectedUsers = {};
io.on('connection', (socket) => {
    console.log('Connected...')
 
    console.log(socket.id);
   
 /*Register connected user*/
 socket.on('register',function(username){
  socket.username = username.name;
  connectedUsers[username] = socket;
});

/*Private chat*/
socket.on('private_chat',function(data){
  const to = data.to
  const frm=data.frm
          message = data.message;
          
  if(connectedUsers.hasOwnProperty(to)){
      connectedUsers[to].emit('private_chat',{
          //The sender's username
          username : frm,
          
          //Message sent to receiver
          message : message
      });
  }

}); 


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
