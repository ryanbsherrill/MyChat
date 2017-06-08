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

// listening for client connection
io.on('connection', (socket) => {
  console.log('CLIENT CONNECTED');

  // listening for createMessage event
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    // emitting recieved message
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });

  // listening for client disconnection
  socket.on('disconnect', () => {
    console.log('CLIENT DISCONNECTED');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
