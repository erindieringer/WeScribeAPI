var Service = require('../models/service');

// Routes and methods

exports.init = function(app) {
	app.get("/service", getAllServices);
	app.get("/service/:name", getServiceByName);
	app.post("/service/:name/:url/:cost/:type", createService);
	app.delete("/service/:name", deleteService);
}

getAllServices = function(req,res){
	Service.find({}, function(err, service) {
	    if (err)
	     	res.send(err);
	  	else 
	    	res.json(service);
	});
}

getServiceByName = function(req,res){
	Service.find({name: req.params.name}, function(err, service) {
	    if (err)
	     	res.send(err);
	  	else 
	    	res.json(service);
	});
}

createService = function(req,res){
	var service = new Service({
		name: req.params.name,
		url: req.params.url,
		monthlyCost: req.params.cost,
		accountType: req.params.type,
	});
	service.save(function(err, service){
		if(err) 
			return next(err);
  		else 
  			res.json(201, service);
	});
}

deleteService = function(res,req){
	Service.remove({_id: req.params.id}, function(err, service) {
    if (err)
      res.send(err);
    res.json({ message: 'Service successfully deleted' });
  }); 
}

