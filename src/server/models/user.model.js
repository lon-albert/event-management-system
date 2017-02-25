/**
 * Created by lon on 2/25/17.
 */
var mongoose = require('mongoose');
var validEmail = require('../helpers/validate');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
  email: {type: String, lowercase: true, trim: true, validate: validEmail.validateEmail}
  ,is_admin: {type: Boolean, default: false}
  , fullname: String
  , salt: {type: String, required: true}
  , password: {type: String, required: true}
});

var User = mongoose.model('user', userSchema);

module.exports = User;
