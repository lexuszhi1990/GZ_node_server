// custom the js files

$(function () {
  var socket = io.connect(window.location.origin);

  socket.emit('left');
});
