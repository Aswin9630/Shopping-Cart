
const createError = require('http-errors');
const express = require('express');
const hbs = require('express-handlebars')
const { create } = require('express-handlebars');
const Handlebars = require('handlebars');
// Define a custom Handlebars helper to increment the index by 1
Handlebars.registerHelper('indexInc', function(index) {
  // Increment index by 1
  return index + 1;
});



const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();
const fileUpload = require('express-fileupload');
const session = require ("express-session");
app.use(session(
  {secret:"my-strong-secretkey",
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:10*60*1000}}
  ));

  const dbConnection = require('./config/connection')
  dbConnection.connect((err)=>{
    if(!err){
      console.log("Database connected to port 27017")
      const connectdb =dbConnection.get();
    }else{
      console.log("error")
    }
  })
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

