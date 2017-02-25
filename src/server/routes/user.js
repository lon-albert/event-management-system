/**
 * Created by lon on 2/25/17.
 */
var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller');

// create new account
router
  .post('/register', function (req, res, next) {
    UserController.register(req ,function (found, next) {
      res.json(found);
    });
  })
  .post('/login', function (req, res, next) {
    UserController.login(req,function (found) {
      res.json(found);
    });
  });

module.exports = router;
