var Credentials = require('../models/credentials');


// Routes and methods

exports.init = function(app) {
	app.get("/credentials/:id", getCredentials);
	app.post("/credentials/:username/:password", createCredentials);
	app.delete("/credentials/:id");

}

getCredentials = function(req,res){
	Credentials.find({_id: req.params.id}, function(err, cred) {
	   if (err)
	     res.send(err);
	  else 
	   	res.json(cred);
	  });
}

createCredentials = function(req, res){
	var cred = new Credentials ({
		username: req.params.username,
		password: req.params.password
	});
	cred.save(function(err, credentials){
		if(err) 
			return next(err);
  		else 
  			res.json(201, credentials);
	});
}

deleteCredentials = function(req, res) {
	Credntials.remove({_id: req.params.id}, function(err, cred) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  }); 
}