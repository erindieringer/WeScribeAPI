var Usage = require('../models/usage');

// Routes and methods

exports.init = function(app) {
	app.get("/usage/", getUsageByUserService);
	app.post("/usage/:start", createUsage);
	app.put("/usage/:id/:end", addEnd)
	app.delete("/usage/:id", deleteUsage);
	app.delete("/usage", deleteAllUsage)
	
}

getUsageByUserService = function(req, res){
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

//Based off of the 
addEnd = function(req, res){
	Usage.findById(req.params.id, function(err, usage){
		if (err) return handleError(err);
		usage.set({ end: req.params.end });
 		usage.save(function (err, upatedUsage) {
    		if (err) return handleError(err);
    		res.send(upatedUsage);
  		});
	});
}

deleteUsage = function(req, res){
	Usage.remove({_id: req.params.id}, function(err, usage) {
    if (err)
      res.send(err);
    res.json({ message: 'Service successfully deleted' });
  }); 
}

deleteAllUsage = function(req, res){
	Usage.remove({}, function(err, usage) {
    	if (err)
      		res.send(err);
    	res.json({ message: 'Service successfully deleted' });
  }); 
}
