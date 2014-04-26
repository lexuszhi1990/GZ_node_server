var routes = require('./routes/index');
var socketIO = require('./routes/socketIO');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var io = require('socket.io');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// setup GPIO for raspi
var wpi = require('wiring-pi');
wpi.setup();
wpi.setup('gpio');
wpi.pinMode(0, wpi.modes.OUTPUT);wpi.pinMode(7, wpi.modes.OUTPUT);
wpi.pinMode(2, wpi.modes.OUTPUT);wpi.pinMode(3, wpi.modes.OUTPUT);
wpi.pinMode(1, wpi.modes.OUTPUT);wpi.pinMode(4, wpi.modes.OUTPUT);
wpi.pinMode(5, wpi.modes.OUTPUT);wpi.pinMode(6, wpi.modes.OUTPUT);

if (!module.parent) {
  // create server
  io.listen(app.listen(process.env.PORT || 8888)).on('connection', socketIO.connection);
  console.log('Express server listening on port 8888');
} else{
  module.exports = app;
}
