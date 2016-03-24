var config = require('config');
var databaseConfig = config.get('database');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	 fullName: {type: String, required: true},
	 emailAddress: {type: String, required: true},
	 userName: {type: String, required: true, index:{unique:true}},
	 password: {type: String, required: true}
 });
// hash the password
userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')){
		return next();
	}
  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err,hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePasswords = function(candidatePassword, cb){
  bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
    if(err) return cb(err);
    cb(null,isMatch);
  });
};

var db = mongoose.createConnection(databaseConfig);
var userModel = db.model('user',userSchema);
module.exports = userModel;
