const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db.js');
var catalogRouter = require('./router/catalog');

var indexRouter = require('./router/index');
var catalogRouter = require('./router/catalog');

var cookieParser = require('cookie-parser');
const { validateLogin } = require('./Controllers/loginController.js');

app.use(cookieParser());
app.use(cors());
app.set('trust proxy', true)
// The documentation specifies '1' instead of 'true'
  mongoose.Promise = global.Promise;
  mongoose.connect(config.dConn, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use('/catalog', catalogRouter); 
  app.use('/login', catalogRouter); 
  app.use('/test', function(req,res){ res.send("Hi Welcome")}); 

app.listen(PORT);

module.exports = app;