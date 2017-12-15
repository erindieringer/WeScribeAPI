var Credentials = require('../models/credentials');

// Credentials store seperately for secruity purposes

exports.init = function(app) {
	app.get("/credentials/:id", getCredentials);
	app.post("/credentials/:username/:password", createCredentials);
	app.delete("/credentials/:id");

}

// Get credentials by ID
getCredentials = function(req,res){
	Credentials.find({_id: req.params.id}, function(err, cred) {
	   if (err)
	     res.send(err);
	  else 
	   	res.json(cred);
	  });
}

// Create new credentials instance
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

// Delete instance of credentials
deleteCredentials = function(req, res) {
	Credntials.remove({_id: req.params.id}, function(err, cred) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  }); 
}