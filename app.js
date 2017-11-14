// Packages Needed
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// use it before all route definitions
// app.use(cors({origin: 'http://localhost:50000'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/users.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/WeScribeAPI');

// Call controllers
require('./controllers/user.js').init(app);
require('./controllers/group.js').init(app);
require('./controllers/credentials.js').init(app);
require('./controllers/usage.js').init(app);


// Start Server on localhost:5000
app.listen(5000);