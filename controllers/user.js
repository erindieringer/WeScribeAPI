var mongoose = require('mongoose');
var User = require('../models/users');

// Routes and methods
exports.init = function(app) {
	app.get("/users/:id", getUserByID);
	app.post("/users/:fname/:lname/:username/:password/:email", postUser);
	app.put("/users/:id/:group", updateGroup);
	app.delete("/users/:id", deleteUser);

}

// Gets user document by ID
getUserByID = function(req, res){
	User.find({_id: req.params.id}, function(err, user) {
	    if (err)
	      res.send(err);
	  	else 
	    	res.json(user);
	  });
}

// Creates new user based on params passed
postUser = function(req, res){
	console.log(req.params);
	var user = new User ({
		first_name: req.params.fname,
		last_name: req.params.lname,
		username: req.params.username,
		password: req.params.password,
		email: req.params.email,
	});
	user.save(function(err, user){
		if(err) 
			 res.send(err);
  		else 
  			res.json(201, user);
	});

}

// Deletes user by ID
deleteUser = function(req, res){
	User.remove({_id: req.params.id}, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  }); 
}

// Ads a group to the user
updateGroup = function(req, res){
	User.findById(req.params.id, function(err, user){
		if (err) 
			return handleError(err);
		
		user.set({ group: req.params.group });
 		user.save(function (err, upatedUser) {
    		if (err) return handleError(err);
    		res.send(upatedUser);
  		});
	});
}