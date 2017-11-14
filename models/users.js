var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema   = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);