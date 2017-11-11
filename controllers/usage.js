var Usage = require('../models/usage');

// Routes and methods

exports.init = function(app) {
	app.get("/usage/", getUsageByUserService);
	app.post("/usage/:start/:end", createUsage);
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

//Date time formatting needs fixing
createUsage = function(req, res){
	console.log("DATE:" + Date(req.params.start));
	var usage = new Usage({
		start: req.params.start,
		end: req.params.end
	});
	usage.save(function(err,usage1){
		if(err) 
			return next(err);
  		else 
  			res.send(usage1);
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