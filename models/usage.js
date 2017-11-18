var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsageSchema   = new Schema({
	users: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
    },
    start: String,
    end: String,
    totalTime: Number
});

module.exports = mongoose.model('Usage', UsageSchema);