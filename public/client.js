const socket = io()
let name,friend_name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
  friend_name = prompt('Please enter your  friend name: ')
} while(!name&&friend_name)
if(name&&friend_name){
    user=name;
    socket.emit('register',user);
}
document.getElementById("user_name").innerHTML = name;
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
  
    socket.emit('private_chat',{
   frm:user,
        to : friend_name,
        message : message
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
socket.on('private_chat',function(msg){
    let data={}
   
    data.user = msg.username;
    data.message = msg.message;
    appendMessage(data, 'incoming')
    scrollToBottom()
});


socket.on('chat',function(msg){
    let data={}
    data.user = "socket";
    data.message = "message";
    appendMessage(data, 'outgoing')
    appendMessage(data, 'incoming')
    scrollToBottom()
});
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}