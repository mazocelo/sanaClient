var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const passport = require('passport')
const session = require('express-session')
require('./auth')(passport)


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require('./routes/usuarios')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 } //30 minutos de duração
}))


app.use(passport.initialize());
app.use(passport.session());


function authMidWare(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', authMidWare, loginRouter);

app.use(function(req, res, next) {
    req.passport = passport;
    next();
})

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