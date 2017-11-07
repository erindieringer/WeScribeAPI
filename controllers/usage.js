var Usage = require('../models/usage');

// Routes and methods

exports.init = function(app) {
	app.get("/usage/:userService", getUsageByUserService);
	app.post("usage/:start/:end", createUsage);
	app.delete("usage/:id", deleteUsage);
	
}

getUsageByUserService = function(req, res){
	Usage.find({userService: req.params.userService}, function(err, service) {
	    if (err)
	     	res.send(err);
	  	else 
	    	res.json(service);
	});	
}

//Date time formatting needs fixing
createUsage = function(req, res){
	var totalTime = Date(req.params.start) - Date(req.params.end);
	console.log(totalTime)
	var time = {
		start: Date(req.params.start),
		end: Date(req.params.end),
		totalTime: totalTime,
	}
	var usage = new Usage({
		// userService: req.userService,
		timePeriod: time
	});
	usage.save(function(err,usage){
		if(err) 
			return next(err);
  		else 
  			res.json(201, usage);
	});
}

deleteUsage = function(req, res){
	Usage.remove({_id: req.params.id}, function(err, usage) {
    if (err)
      res.send(err);
    res.json({ message: 'Service successfully deleted' });
  }); 
}