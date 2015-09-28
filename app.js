var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var sass = require('node-sass-middleware');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('view engine', null);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// sass middleware
app.use(sass({
    src: __dirname + '/src/css',
    dest: __dirname + '/public',
    outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

module.exports = app;
