// custom the js files

$(function () {
  var socket = io.connect(window.location.origin);

  // custom the four actions
  $("#left").click(function (event) {
    event.stopPropagation();
    event.preventDefault();

    socket.emit("left");
  });

  $("#right").click(function (event) {
    event.stopPropagation();
    event.preventDefault();

    socket.emit("right");
  });

  $("#stop").click(function (event) {
    event.stopPropagation();
    event.preventDefault();

    socket.emit("stop");
  });

  $("#back").click(function (event) {
    event.stopPropagation();
    event.preventDefault();

    socket.emit("back");
  });
});
