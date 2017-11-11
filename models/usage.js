var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsageSchema   = new Schema({
    start: String,
    end: String,
    totalTime: Number
});

module.exports = mongoose.model('Usage', UsageSchema);