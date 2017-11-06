// Packages Needed
var express = require("express");
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WeScribe');

// Call controllers
require('./controllers/user.js').init(app);
require('./controllers/group.js').init(app);
require('./controllers/credentials.js').init(app);
require('./controllers/service.js').init(app);
require('./controllers/usage.js').init(app);
require('./controllers/userService.js').init(app);

// Start Server on localhost:5000
app.listen(5000);