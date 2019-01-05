var mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var Schema   = mongoose.Schema;

// Define collection and schema for User
var userSchema = new mongoose.Schema({
  email : {type: String, required:true, unique: true},
  password : {type: String, required:true, unique: true},
  resetPasswordToken: String,

});

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);
