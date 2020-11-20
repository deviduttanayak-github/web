var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var conf = require('./conf');

var login_register = require('./routes/login_register');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/build')));
app.use(cors());

// app.use(cookieParser(conf["Secret-Key"]));  // for cookie use
app.use(session({                              // for session storage
  name : 'session-id',
  secret : conf["Secret-Key"],
  saveUninitialized : false,
  resave : false,
  cookie : { expires : 30*24*60*60*1000}, // in ms
  store : new FileStore(),
}));
// passport 
// app.use(passport.initialize());

// mongodb-connection
// console.log(conf.mongoURL); console.log(conf["Secret-Key"]);
mongoose.connect( conf.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if(err){
    console.log(err);
  }
  else console.log("Connected to mongodb. Ok.")
});


// routes-------------------
app.use('/api/auth', login_register);
app.use('/api', indexRouter);
app.get('*', express.static('.client/build'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
