var express = require('express');
var router = express.Router();
var wpi = require('wiring-pi'); // https://github.com/lexuszhi1990/node-wiring-pi

/*
 * handle Socket message
 */

router.connection = function (socket) {
  socket.on('left', function (data) {
    // we tell the client to execute 'new message'
    // socket.broadcast.emit('new message', {
    //   username: socket.username,
    //   message: data
    // });

    // move left

    wpi.digitalWrite(0, wpi.HIGH);
    wpi.digitalWrite(7, wpi.HIGH);

    // after 1 seconds

    console.log("move left");
  });

  socket.on('right', function (data) {
    // move right
    console.log("move right");
  });
  socket.on('back', function (data) {
    // move back
    console.log("move back");
  });
  socket.on('stop', function (data) {
    // move stop
    console.log("move stop");
  });
};

module.exports = router;
