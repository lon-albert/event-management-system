/**
 * Created by lon on 2/25/17.
 */

module.exports = {
  'validateEmail' : function (email) {
    return email.match(/\S+@\S+/);
  }
  ,
  'validatePassword' : function (password) {
    return password.match(/([a-z].*[a-z])/) && password.length > 4;
  }
};
