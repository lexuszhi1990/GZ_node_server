var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();
var server = app.listen(8888);
var io = require('socket.io').listen(server);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

console.log("Express server listening on port" + 8888);

io.on('connection', function (socket) {
  var addedUser = false;
  console.log("log here");
}
