var routes = require('./routes');
var user = require('./routes/user');
var socketIO = require('./routes/socketIO');
var express = require('express');
var http = require('http');
var path = require('path');
var wpi = require('wiring-pi'); // https://github.com/lexuszhi1990/node-wiring-pi

var app = express();
var server = app.listen(process.env.PORT || 8888);
var io = require('socket.io').listen(server);

io.on('connection', socketIO.connection);

app.configure(function(){
  app.set('port', process.env.PORT || 8888);
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
