var Usage = require('../models/usage');

// Routes and methods

exports.init = function(app) {
	app.get("/usage/:user/:month");
	app.get("/usage/", getUsage);
	app.post("/usage/:start", createUsage);
	app.put("/usage/:id/:end", addEnd);
	app.delete("/usage/:id", deleteUsage);
	app.delete("/usage", deleteAllUsage);
}
// Gets all usage
getUsage = function(req, res){
	Usage.find({}, function(err, service) {
	    if (err)
	     	res.send(err);
	  	else 
	    	res.json(service);
	});	
}

//To create a new usage with just a start
createUsage = function(req, res){
	var usage = new Usage({
		start: req.params.start,
	});
	usage.save(function(err,usage1){
		if(err) 
			return next(err);
  		else 
  			res.send(usage1);
	});
}

// Adds end time to usage instance
addEnd = function(req, res){
	Usage.findById(req.params.id, function(err, usage){
		if (err) 
			return handleError(err);
		var hours = Math.abs(usage.start - req.params.end) / 36e5; // calculates total time in session
		usage.set({ end: req.params.end, totalTime: hours });
 		usage.save(function (err, upatedUsage) {
    		if (err) return handleError(err);
    		res.send(upatedUsage);
  		});
	});
}

//Deletes usage instance
deleteUsage = function(req, res){
	Usage.remove({_id: req.params.id}, function(err, usage) {
    if (err)
      res.send(err);
    res.json({ message: 'Service successfully deleted' });
  }); 
}

// Deletes all usage (for testing purposes)
deleteAllUsage = function(req, res){
	Usage.remove({}, function(err, usage) {
    	if (err)
      		res.send(err);
    	res.json({ message: 'Service successfully deleted' });
  }); 
}
