const socket = io();

socket.on('connect', function () {
  console.log('SERVER CONNECTED');

  socket.emit('createMessage', {
    from: 'Ryan',
    text: 'Hello World!',
  });
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

socket.on('disconnect', function () {
  console.log('SERVER DISCONNECTED');
});
