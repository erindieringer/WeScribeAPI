var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    first_name: String,
    last_name: String,
    username: {
    	type: String,
    	unique: true
    },
    password: String,
    email: {
    	type: String,
    	//match: [Regex],
    	unique: true,
    }
    group: {
    	type: mongoose.Schema.Type.ObjectId,
    	ref: 'Group'
    }
});

module.exports = mongoose.model('User', UserSchema);