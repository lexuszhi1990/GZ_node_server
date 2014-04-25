var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = app.listen(8888);
var io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

console.log('Express server listening on port ' + app.get('port'));

io.on('connection', function (socket) {
  var addedUser = false;
  console.log("One connection comess");

  socket.on('left', function (data) {
    // we tell the client to execute 'new message'
    // socket.broadcast.emit('new message', {
    //   username: socket.username,
    //   message: data
    // });

    // move left
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

});
