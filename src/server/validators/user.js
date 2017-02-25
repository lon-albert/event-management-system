/**
 * Created by lon on 2/25/17.
 */
var util = require('util');

var validateRegister = function(req, callback) {

  // console.log(req.body);

  var valid = true;
  // validate the input
  req.checkBody('email', 'Email does not appear to be valid').isEmail();
  req.checkBody('fullname', 'Firstname is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  // check the validation object for errors
  var errors = req.validationErrors();

  if(errors){
    valid = false;
    callback(valid, 'There have been validation errors: ' + util.inspect(errors));
    return;
  }

  callback(valid);
};

module.exports = validateRegister;
