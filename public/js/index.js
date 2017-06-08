const socket = io();

// LISTENING FOR SERVER CONNECTION
socket.on('connect', function () {
  console.log('SERVER CONNECTED');
});

// LISTENING FOR 'newMessage' EVENT
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

// LISTENING FOR SERVER DISCONNECT
socket.on('disconnect', function () {
  console.log('SERVER DISCONNECTED');
});
