// custom the js files

$(function () {
  var socket = io.connect('http://localhost');

  socket.emit('left');
});
