// Packages Needed
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var passport = require('passport');
var config = require('./config/database');
var authentication = require('./controllers/authentication');

// Accesses local databases
mongoose.connect(config.database);

// Allow cross origin access from local db when extension call it
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());
app.use(morgan('dev'));

// Call controllers
require('./controllers/user.js').init(app);
require('./controllers/group.js').init(app);
require('./controllers/credentials.js').init(app);
require('./controllers/usage.js').init(app);
// require('./controllers/authentication.js').init(app);

app.use('/auth', authentication);



// Start Server on localhost:5000
app.listen(5000);