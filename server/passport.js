var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User =  require('./model/user');

passport.use(new LocalStrategy({
    email: 'user[email]',
    password: 'user[password]'
}, function(email, password, done){

    User.findOne({email: email})

       .then(function(user){
       if(!user || !user.validPassword(password)){
           return done(null, false, {errors: {"email or password":"is invalid."}})
         }
     return done(null, user);
     })
    .catch(done);
  })
);
