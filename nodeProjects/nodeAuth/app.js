const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const localStrategy = require('passport-local').Strategy;
const multer = require('multer');
const upload = multer({dest: './uploads'});
const flash = require('connect-flash');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const db = mongoose.connection;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Handle File Uploads.

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handle sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift()
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

//Handle messages with flash

app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
