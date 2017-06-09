const socket = io();

// LISTEN FOR SERVER CONNECTION
socket.on('connect', function () {
  console.log('Server Connected');
});

// LISTEN FOR SERVER DISCONNECT
socket.on('disconnect', function () {
  console.log('Server Disconnected');
});

// LISTEN FOR 'newMessage' EVENT
socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  // CREATE 'newMessage' FROM INPUT
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  // RENDER 'newMessage' TO THE DOM
  jQuery('#messages').append(li);
});

// LISTEN FOR '#message-form' SUBMIT
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  // SEND MESSAGE
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
