/**
 * Created by lon on 2/25/17.
 */
module.exports = function validString (s) {
  if ('string' != typeof s) {
    s = '';
  }
  return s.trim();
}
