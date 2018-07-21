var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

var app = express();
app.use(cors())

var USERS = [
  { 'id': '001', 'username': 'rlara@13.cl' },
  { 'id': '011', 'username': 'jtello@13.cl' },
  { 'id': '012', 'username': 'hmeza@13.cl' },
  { 'id': '013', 'username': 'malvear@13.cl' },
  { 'id': '014', 'username': 'jcaguirre@13.cl' },
  { 'id': '111', 'username': 'gerardo.pizarro@13.cl' },
  { 'id': '112', 'username': 'csalinas@13.cl' },
  { 'id': '113', 'username': 'mmendezp@13.cl' },
  { 'id': '114', 'username': 'josue.yanez@13.cl' }
];
function getUsers() {
  return USERS;
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Validadr Header especifico
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/bitAppApi')
  //es el nombre de la DB en mongo
  //es el nombre con que se crea en express
  //> use api-bitacora
  //switched to db api-bitacora
  //> show collections
  //bitacoras

  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

var registro = require('./routes/registro');//registro.js
app.use('/api', registro);
// Auth
app.post('/api/auth', function(req, res) {
  const body = req.body;

  const user = USERS.find(user => user.username == body.username);

  if(!user || body.password != 'incidencias') return res.sendStatus(401);
  
  var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
  res.send({token});
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
