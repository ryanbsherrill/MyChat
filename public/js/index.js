const socket = io();

// LISTEN FOR SERVER CONNECTION
socket.on('connect', function () {
  console.log('Server Connected');
});

// LISTEN FOR SERVER DISCONNECT
socket.on('disconnect', function () {
  console.log('Server Disconnected');
});

// LISTEN FOR 'newMessage'
socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  // CREATE 'newMessage' FROM INPUT
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  // RENDER 'newMessage' TO THE DOM
  jQuery('#messages').append(li);
});

// LISTEN FOR 'newLocationMessage'
socket.on('newLocationMessage', function (message) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My Current Location</a>');

  // CREATE 'newLocationMessage' FROM INPUT
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

  // RENDER 'newLocationMessage' TO DOM
  jQuery('#messages').append(li);
});

// LISTEN FOR '#message-form' SUBMIT
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

const messageTextbox = jQuery('[name=message]');

  // SEND MESSAGE
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val(),
  }, function () {
    messageTextbox.val('');
  });
});

// GEOLOCATION BUTTON
const locationButton = jQuery('#send-location');

// LISTEN FOR '#send-location' CLICK
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return $.notify('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');
  // GET AND EMIT LOCATION
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');;
    socket.emit('createLocatonMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    $.notify('Unable to get location');
  });
});
