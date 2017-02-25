/**
 * Created by lon on 2/25/17.
 */
var crypto = require('crypto');
var rand = require('csprng');
var temp = rand(160, 36);

exports.hash = function (password) {
  var newpass = temp + password;
  return crypto.createHash('sha512').update(newpass).digest("hex");
};

exports.token = function (email) {
  return crypto.createHash('sha512').update(email +rand).digest("hex");
};

exports.salt = temp;
