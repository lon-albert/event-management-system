/**
 * Created by lon on 2/25/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  content: String,
  event: {type: ObjectId, ref: 'event'},
  author: {type: ObjectId, ref: 'user'}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
