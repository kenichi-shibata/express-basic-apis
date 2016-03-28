var express = require('express');
var session = require('client-sessions');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./config/routes/index');
var auth = require('./config/routes/auth');
var users = require('./config/routes/user');
var cat = require('./config/routes/cat');
var app = express();

function requireLogIn(req,res,next){
  if(req.session.user)
    next();
  else if(!req.session.user) {
    res.redirect('/loginPage');
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for storing sessions
app.use(session({
  cookieName: 'session',
  secret: 'this-is-my-unencrypted-key-it-will-be-encrypted-by-client-sessions-package',
  duration: 60 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
}));

app.use('/',auth);
app.use('/',routes);
// needs auth
app.use('/users', requireLogIn, users);
app.use('/cats', requireLogIn, cat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
// this is not needed server is run from ./bin/www

module.exports = app;
