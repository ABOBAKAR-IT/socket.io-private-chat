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
var userbox = {}

io.on('connection', (socket) => {
  console.log('Connected...')
  console.log(socket.id);
  /*Register connected user*/
  socket.on('register', function (username) {
    if (connectedUsers.hasOwnProperty(username))
  {
    socket.username = username;
    connectedUsers[username] = socket;
    userbox[username] = []
     connectedUsers[username].emit('chat',
     userbox
     );
    console.log("user exist");
  }else{
    socket.username = username;
    connectedUsers[username] = socket;
    userbox[username] = []
    console.log(username);
  }
    // console.log(name);
  });

  /*Private chat*/
  socket.on('private_chat', function (data) {
    let to = data.to
    let frm = data.frm
    message = data.message;
    var sms = {}
    sms["to"] = message
    userbox[frm].push(sms);
    var sms = {}
    sms["frm"] = message
    userbox[to].push(sms);
    if (connectedUsers.hasOwnProperty(to)) {
     
      connectedUsers[to].emit('private_chat', {
        //The sender's username
        username: frm,
        //Message sent to receiver
        message: message
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