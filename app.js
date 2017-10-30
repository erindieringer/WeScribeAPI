// Packages Needed
var express = require("express");
var app = express();
var mongoose = require('mongoose');

//mongoose.connect();

// Call controllers
require('./controllers/user.js').init(app);
require('./controllers/group.js').init(app);


// Start Server on localhost:5000
app.listen(5000);