var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserServiceSchema   = new Schema({
    user: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
    },
    service: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Service'
    },
    credentials: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Credentials'
    },
    primaryAccount: Boolean
   
});

module.exports = mongoose.model('UserService', UserServiceSchema);