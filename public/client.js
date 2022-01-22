const socket = io()

var uname, friend_name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    uname = prompt('Please enter your name: ')
    friend_name = prompt('Please enter your  friend name: ')
} while (!uname && friend_name)
if (uname && friend_name) {
    user = uname;
    socket.emit('register', user);

}
document.getElementById("user_name").innerHTML = uname;
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: uname,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 

    socket.emit('private_chat', {
        frm: user,
        to: friend_name,
        message: message
    });
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


/*Received private messages*/
socket.on('private_chat', function (msg) {
    let data = {}

    data.user = msg.username;
    data.message = msg.message;
    appendMessage(data, 'incoming')
    scrollToBottom()
});


socket.on('chat', function (msg) {
    let name = prompt("welcome login again")
    let data = {}
    console.log(msg);
    data.user = "socket";
    data.message = "message";
    appendMessage(data, 'outgoing')
    appendMessage(data, 'incoming')
    scrollToBottom()
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}