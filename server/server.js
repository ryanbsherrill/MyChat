const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

// LISTENING FOR CLIENT CONNECTION
io.on('connection', (socket) => {
  console.log('CLIENT CONNECTED');

  // ADMIN: WELCOME MESSAGE
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime(),
  });

  // ADMIN: NEW USER MESSAGE
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined',
    createdAt: new Date().getTime(),
  });

  // LISTENING FOR 'createMessage' EVENT
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    // EMITTING RECIEVED MESSAGE
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });

  // LISTENING FOR CLIENT DISCONNECT
  socket.on('disconnect', () => {
    console.log('CLIENT DISCONNECTED');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
