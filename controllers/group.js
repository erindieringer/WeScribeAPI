var Group = require('../models/groups');
var mongoose = require('mongoose');
var User = require('../models/users');
mongoose.Promise = Promise;

exports.init = function(app) {
	app.get("/groups", getAllGroups);
	// app.get("/groups/:user", getUsersGroup);
	app.get("/groups/:id", getGroupById);
	app.post("/groups/:name/:pay/:date/:credentials", createGroup);
	app.put("groups/:id/:user", addUserToGroup)
	app.delete("/groups/:name", deleteGroup);
}

getAllGroups = function(req,res){
	Group.find({}, function(err, group) {
	    if (err)
	     	res.send(err);
	  	else 
	    	res.json(group);
	});
}

getGroupById = function(req,res){
	Group.find({_id: req.params.id}, function(err, group) {
	    if (err)
	     	res.send(err);
	  	else 
	    	res.json(group);
	});
}

createGroup = function(req, res){
	//find users based off of user name 
	var group = new Group({
		name: req.params.name,
		totalPayment: req.params.pay,
    	paymentDate: req.params.date,
	    credentials: mongoose.Types.ObjectId(req.params.credentials),
	});
	
	group.save(function(err, service){
		if(err) 
			return next(err);
  		else 
  			res.json(201, service);
	});
}

//not working
addUserToGroup = function(req, res){
	Group.update({_id: req.params.id}, 
				{ $push: { users: mongoose.Types.ObjectId(req.params.user)} },
    			{safe: true, upsert: true},
				 function(err, group) {
				    if (err)
				     	res.send(err);
				  	else 
				    	res.json(group);
				});

}

deleteGroup = function(res,req){
	Group.remove({_id: req.params.id}, function(err, group) {
    if (err)
      res.send(err);
    res.json({ message: 'Group successfully deleted' });
  }); 
}

