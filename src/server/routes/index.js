/**
 * Created by lon on 2/25/17.
 */
var express = require('express');
var router = express.Router();
var events = require('./event'),
  comments = require('./comment'),
  users = require('./user');

module.exports = function (app) {
  app.use('/api+', router
    .use(events)
    .use(comments)
    .use(users));
};
