var socket = io();

const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const outputElement = document.getElementById('output');
const typingOutput = document.getElementById('typing-output');
const sendBtn = document.getElementById("send-btn");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputLength = nameInput.value.length;
    const messageLength = messageInput.value.length;

    if((inputLength != 0) && (messageLength != 0)) {
        const data = {
            name: nameInput.value,
            message: messageInput.value
        }

        socket.emit('chat', data);
    }

    messageInput.value = "";
})

messageInput.addEventListener('keypress', () => {
    socket.emit('typing', nameInput.value)
})

// Listening to server events of websockets
socket.on('chat', (data) => {
    typingOutput.innerHTML = "";
    outputElement.innerHTML += `<p><strong>${data.name}: </strong>${data.message}</p>`
})

socket.on('typing', (data) => {
    typingOutput.innerHTML = `<p><em>${data} is typing...</em></p>`;
})