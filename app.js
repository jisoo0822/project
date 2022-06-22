var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');

var homes = require('./routes/route.js');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.set('layout','layout');
app.set('layout extractScripts',true);


app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));
//css img 의 파일사용을 위한 경로설정

app.use('/',homes);  //미들웨어 등록

module.exports = app;