
var createError = require('http-errors');
var express = require('express');
var hbs = require('express-handlebars')
const { create } = require('express-handlebars');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();
var fileUpload = require('express-fileupload')

var dbConnection = require('./config/connection')
// view engine setup
app.set('views', path.join(__dirname, 'views'));

const viewEngine= hbs.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials'
});

app.engine('hbs', viewEngine.engine)
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

dbConnection.connect((err)=>{
  if(!err){
    console.log("Database connected to port 27017")
    const connectdb =dbConnection.get();
  }else{
    console.log("error")
  }
})




app.use('/', userRouter);
app.use('/admin', adminRouter);

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

