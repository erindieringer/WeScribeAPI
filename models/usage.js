var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsageSchema   = new Schema({
    service: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Service'
    },
    amount: Number,
    timePeriod: {
    	start: Date,
    	end: Date,
    	totalTime: Number
    }
   
});

module.exports = mongoose.model('Usage', UsageSchema);