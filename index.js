const express = require('express');
const socket = require('socket.io');

const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('chat', (data) => {
    console.log(data);

    // sending data to all clients
    io.sockets.emit('chat', data)
  })

  socket.on('typing', (data) => {
    // sending this data to all other sockets expets the socket that send data
    socket.broadcast.emit('typing', data);
  })
});