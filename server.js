const express = require("express");
const app = express();
const http = require("http").createServer(app);
const database = require("./4_model/database");
const userRoute = require("./1_router/userRouter");
const user = require("./3_services/userServices");
const PORT = process.env.PORT || 3110;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
app.use(express.static(__dirname + "/public"));
app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket
const io = require("socket.io")(http);
var connectedUsers = {};
var userbox = {};

io.on("connection", (socket) => {
  console.log("Connected...");
  console.log(socket.id);
  /*Register connected user*/
  socket.on("register", async function (username) {
    let data = await user.find(username);
    //  if (connectedUsers.hasOwnProperty(username))
    if (data) {
      socket.username = username;
      connectedUsers[username] = socket;
      userbox[username] = [];
      let chat = await user.find(username);
      console.log("user : " + chat);
      connectedUsers[username].emit("chat", chat);
      console.log("user exist");
    } else {
      socket.username = username;
      connectedUsers[username] = socket;
      userbox[username] = [];
      await user.add(username);
    }
  });

  /*Private chat*/
  socket.on("private_chat", async function (data) {
    let to = data.to;
    let frm = data.frm;
    message = data.message;
    var sms = {};
    sms["to"] = message;
    userbox[frm].push(sms);
    await user.update(sms, frm);
    var sms = {};
    sms["frm"] = message;
    userbox[to].push(sms);
    await user.update(sms, to);

    if (connectedUsers.hasOwnProperty(to)) {
      let d = await user.find(to);
      console.log("sms : " + d.sms);
      connectedUsers[to].emit("private_chat", {
        //The sender's username
        username: frm,
        //Message sent to receiver
        message: message,
      });
    }
  });
});