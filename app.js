// Packages Needed
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');

// use it before all route definitions
// app.use(cors({origin: 'http://localhost:50000'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect('mongodb://localhost/WeScribeAPI');

// Call controllers
require('./controllers/user.js').init(app);
require('./controllers/group.js').init(app);
require('./controllers/credentials.js').init(app);
require('./controllers/usage.js').init(app);


// Start Server on localhost:5000
app.listen(5000);