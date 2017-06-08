const socket = io();

// listening for server connection
socket.on('connect', function () {
  console.log('SERVER CONNECTED');
});

// listening for new message
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

// listening for server disconnect
socket.on('disconnect', function () {
  console.log('SERVER DISCONNECTED');
});
