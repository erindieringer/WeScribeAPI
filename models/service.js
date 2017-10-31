var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ServiceSchema   = new Schema({
	name: String,
	url: String,
	monthlyCost: Number,
	accountType: String,
	paymentDate: Date
});

module.exports = mongoose.model('Service', ServiceSchema);