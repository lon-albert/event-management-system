/**
 * Created by lon on 2/25/17.
 */
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment.model');
var mongoose = require('mongoose');

router
// get all comments
  .get('/comments', function(req, res) {
    Comment.find({})
      .populate(['author', 'event'])
      .exec()
      .then(
        docs => {
          res.json(docs);
        }
      )
      .catch(
        err => {
          return console.error(err);
        }
      );
  })

  // find by Event id
  .get('/comments/:event_id', function(req, res) {
    Comment.find({event: req.params.event_id})
      .populate(['author', 'event'])
      .exec()
      .then(
        docs => {
          res.json(docs);
        }
      )
      .catch(
        err => {
          return console.error(err);
        })
  })


  // count all
  .get('/comments/count', function(req, res) {
    Comment.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  })

  // create
  .post('/comment', function(req, res) {
    console.log(req.body);
    var obj = new Comment(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      Comment
        .populate(obj, ['author', 'event'], (err, doc) => {
          if(err) return console.error(err);
          res.status(200).json(doc);
        })
    });
  })

  // find by id
  .get('/comment/:id', function(req, res) {
    Comment.findOne({_id: req.params.id})
      .populate(['author', 'event'])
      .exec()
      .then(
        doc => {
          res.json(doc);
        }
      )
      .catch(
        err => {
          return console.error(err);
        })
  })


  // update by id
  .put('/comment/:id', function(req, res) {
    Comment.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err, doc) {
      if(err) return console.error(err);
      Comment
        .populate(doc, ['author', 'event'], (err, doc) => {
          if(err) return console.error(err);
          res.status(200).json(doc);
        })
    })
  })

  // delete by id
  .delete('/comment/:id', function(req, res) {
    Comment.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  })

module.exports = router;
