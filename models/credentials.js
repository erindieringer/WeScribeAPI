var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CredentialSchema   = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Credentials', CredentialSchema);