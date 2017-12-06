var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GroupSchema   = new Schema({
    name: String,
    totalPayment: Number,
    paymentDate: String,
    credentials: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Credentials'
    },
});

module.exports = mongoose.model('Group', GroupSchema);