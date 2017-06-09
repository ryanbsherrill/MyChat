const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

// LISTEN FOR CLIENT CONNECTION
io.on('connection', (socket) => {
  console.log('Client Connected');

  // ADMIN: WELCOME MESSAGE
  socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));

  // ADMIN: NEW USER MESSAGE
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // LISTEN FOR 'createMessage' EVENT
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    // EMIT RECIEVED MESSAGE
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  // SEND 'newLocationMessage' TO DOM
  socket.on('createLocatonMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage(
      'Admin', coords.latitude, coords.longitude
    ));
  });

  // LISTEN FOR CLIENT DISCONNECT
  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
