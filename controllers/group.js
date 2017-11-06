var Group = require('../models/groups');
var mongoose = require('mongoose');
// Routes and methods

exports.init = function(app) {
	app.get("/groups", getAllGroups);
	app.get("/groups/:id", getGroupById);
	app.post("/groups/:name", createGroup);
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

createGroup = function(req,res){
	var group = new Group({
		name: req.params.name
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
    			done
	);
}

deleteGroup = function(res,req){
	Group.remove({_id: req.params.id}, function(err, group) {
    if (err)
      res.send(err);
    res.json({ message: 'Group successfully deleted' });
  }); 
}

