var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/desarrolloweb')

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mysql'
})
connection.connect(function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('ID'+connection.threadId)
})

let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS desarrolloweb'

connection.query(queryCreateDB, function(err, results, fields){
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
});

let queryCreateTableGoals = 'CREATE TABLE IF NOT EXISTS `goals` ( \
  `id` int(11) NOT NULL auto_increment, \   \
  `name` varchar(250) NOT NULL default \'\', \
  `description` varchar(250) NOT NULL DEFAULT \'\', \
  `dueDate` varchar(250) NOT NULL DEFAULT \'\', \
  PRIMARY KEY (`id`) \
  );'

connection.query(queryCreateTableGoals , function(err, results, fields){
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
});

connection.destroy()


let apiKey;

function generarAPIKey(longitud) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\',.<>?';
  let apiKey = '';

  for (let i = 0; i < longitud; i++) {
    apiKey += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return apiKey;
}

apiKey = generarAPIKey(16)

console.log('la clave de autorización es:' + apiKey)


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks= require('./routes/tasks');
var usersGoals= require('./routes/goals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use('/',router)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router.use((req,res, next)=>{
  if(req.headers.authorization && req.headers.authorization === apiKey){
    next();
  }else{
    res.status(401).json({'error': 'no se puede acceder'})
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', usersTasks);
app.use('/goals', usersGoals);

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
