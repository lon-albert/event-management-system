/**
 * Created by lon on 2/25/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var eventSchema = mongoose.Schema({
  title: String,
  startdatetime: String,
  duration: Number,
  description: String,
  location: String,
  visible: Boolean,
  author: {type: ObjectId, ref: 'user'}
});

var Event = mongoose.model('event', eventSchema);

module.exports = Event;
