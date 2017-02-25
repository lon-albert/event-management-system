/**
 * Created by lon on 2/25/17.
 */
/**
 * Created by lon on 10/9/16.
 */
var crypto = require('crypto');
var hash = require('../helpers/hash');
var cleanString = require('../helpers/cleanString');
var mongoose = require('mongoose');
var User = require('../models/index').user;
var paramValidators = require('../validators/index');

var login = function(req,callback) {
  var body = req.body;
  var email = cleanString(body.email);
  var password = cleanString(body.password);
  User.findOne({email: email},function(err,user){
    if(user != null){
      var salt = user.salt;
      var hash = user.password;
      var token = user.token;
      var newpassword = salt + password;
      var re_hash = crypto.createHash('sha512').update(newpassword).digest("hex");
      if(hash == re_hash){
        callback({'message':"Login Sucess",'error':false,'user':user});
      }else{
        callback({'message':"Invalid Password",'error':true});
      }
    }else {
      callback({'message':"User doesn't exist",'error':true});
    }
  });
};

var register = function(req,callback, next) {
  paramValidators.user(req, function (valid, errors) {
    if(valid) {
      var body = req.body;
      var email = cleanString(body.email);
      var password = cleanString(body.password);
      var fullname = cleanString(body.fullname);

      User.find({email: email}, function (err, users) {
        let is_admin = false;
        if(email === "admin@admin.com") {
          is_admin = true;
        }
        if (users.length == 0) {

          let user = new User({
            email: email,
            fullname: fullname,
            salt: hash.salt,
            password: hash.hash(password),
            token: hash.token(email),
            is_admin: is_admin
          });
          user.save(function (err) {
            if (err) {
              console.log(err);
              if (err instanceof mongoose.Error.ValidationError) {
                callback({'response': "Invalid data"});
              }else{
                return next(err)
              }
            }else{
              callback({'message': "Sucessfully Registered", 'error': false});
            }
          });
        } else {
          callback({'message': "Email already Registered", 'error': true});
        }
      });
    }
    else{
      callback({'message': errors, 'error':true});
    }
  });
};

module.exports = {'register' : register, 'login': login};
