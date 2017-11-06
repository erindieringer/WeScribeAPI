var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsageSchema   = new Schema({
    userService: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'UserService'
    },
    amount: Number,
    timePeriod: {
    	start: Date,
    	end: Date,
    	totalTime: Number
    }
   
});

module.exports = mongoose.model('Usage', UsageSchema);