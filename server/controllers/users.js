//const passport = require('passport');
const User = require('../model/user');
const bcrypt= require('bcrypt');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');

module.exports.register = function(req, res) {
  User.find({email:req.body.email})
  .exec ()
  .then( user=>{
    if(user.length >=1){
      return res.status(409).json({
        message:'Mail Exist'
      });
    }else{
      bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password,salt,(err, hash)=>{
        if (err) {
          return res.status(500).json({
            error: err
          });
        }else{
         var user = new User({
          email : req.body.email,
          password: hash
        });

            user
          .save()
          .then(result=>{
            res.status(201).json({
              message:'user Create Succesfully',
            })
          })
          .catch(err=>{
            res.status(500).json({
              error:err
            });
          });
      }
    });
  });
    }
  })
};
module.exports.login = function(req, res) {
var user = new User();
var email = req.body.email;
var password = req.body.password;
var token = user.generateJwt();
//var hash=bcrypt.compare(password, user.password);


 User.findOne({email:email},function(err, user){
   if(err){
      return res.status(500).json({error:err });
   }
   if(!user){
      return res.status(404).json({
        message:'User email or password not Exist'});
   }
 else if(user) {
   bcrypt.compare(req.body.password, user.password, function(err, result) {

  if (result){
  return res.status(200).json({
      "message":'Login Succesfully',
      "token":token,
      "data":user
   })
  } else {
    return res.status(404).json({success: false, message: 'passwords do not match'});
    }
   });
 }
 });
}


module.exports.deleteUser = function(req, res, next){

    User.deleteOne({_id:req.params._id})
    .then(result=>{
      res.json({message:'User Deleted' })
    })
    .catch(
      err=>{
        res.status(500).json({
          error:err
      });
});
};

module.exports.allUser=function(req, res, next){
User.find(function (err, user) {
    if (err) {
      return next(new Error(err))
    }
    res.json(user)
  })
}

module.exports.forgetPassword=function(req, res){
        var token = 'hhhhhhhhhhhh'
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            return res.send('No account with that email address exists.');
          }
          user.resetPasswordToken = token;
          user.save(function(err) {
            if(err) console.log(err)
            var smtpTransport = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user:'techkopratest@gmail.com',
                pass:'@#techbaba123#@'
              }
            });
            var mailOptions = {
              to: user.email,
              from: 'noreply@gmail.com',
              subject: 'Node.js Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://localhost:3000/forgetPassword/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err,info) {
              console.log(info);  
              return res.send('Send Link for password reset in registered E .');
            });
          });
      })
  }

  module.exports.changePassword=function(req, res){
          User.findOne({ resetPasswordToken: req.body.token }, function(err, user) {
            if (!user) {
              return res.send('No account with that email address exists.');
            }
            bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password,salt,(err, hash)=>{
              if (err) {
                return res.status(500).json({
                  error: err
                });
              }else{
                console.log(hash,"hash")
                user.password= hash
                console.log(user.password,"user password")
                user
                .save()
                .then(result=>{
                  res.status(201).json({
                    message:'Succesfully',
                  })
                })
                .catch(err=>{
                  res.status(500).json({
                    error:err
                  });
                });
            }
          });
        });
      });
    }
// module.export.logout=function(req,res){


// }
// var express = require('express');    //Express Web Server
// var busboy = require('connect-busboy'); //middleware for form/file upload
// var path = require('path');     //used for file path
// var fs = require('fs-extra');       //File System - for file manipulation
//
// var app = express();
// app.use(busboy());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.route('/upload')
//     .post(function (req, res, next) {
// 
//         var fstream;
//         req.pipe(req.busboy);
//         req.busboy.on('file', function (fieldname, file, filename) {
//             console.log("Uploading: " + filename);
//
//             //Path where image will be uploaded
//             fstream = fs.createWriteStream(__dirname + '/img/' + filename);
//             file.pipe(fstream);
//             fstream.on('close', function () {
//                 console.log("Upload Finished of " + filename);
//                 res.redirect('back');           //where to go next
//             });
//         });
//     });
