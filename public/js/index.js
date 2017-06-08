const socket = io();

// LISTENING FOR SERVER CONNECTION
socket.on('connect', function () {
  console.log('Server Connected');
});

// LISTENING FOR 'newMessage' EVENT
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

// LISTENING FOR SERVER DISCONNECT
socket.on('disconnect', function () {
  console.log('Server Disconnected');
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi',
}, function (data) {
  console.log('Got it!', data);
});
