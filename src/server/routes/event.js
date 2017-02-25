/**
 * Created by lon on 2/25/17.
 */
var express = require('express');
var router = express.Router();
var Event = require('../models/event.model');
var mongoose = require('mongoose');

router
// get all events
  .get('/events', function(req, res) {
    Event.find({})
      .populate('author')
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

  .get('/front/events', function(req, res) {
    Event.find({visible: true})
      .populate('author')
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

  // get all events
  .get('/user/:user_id/events', function(req, res) {
    let user_id = req.params.user_id;
    Event.find({author: user_id})
      .populate('author')
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

  // count all
  .get('/events/count', function(req, res) {
    Event.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  })

  // create
  .post('/event', function(req, res) {
    console.log(req.body);
    var obj = new Event(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      Event
        .populate(obj, ['author'], (err, doc) => {
          if(err) return console.error(err);
          res.status(200).json(doc);
        })
    });
  })

  // find by id
  .get('/event/:id', function(req, res) {
    Event.findOne({_id: req.params.id})
      .populate('author')
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
  .put('/event/:id', function(req, res) {
    Event.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err, doc) {
      if(err) return console.error(err);
      Event
        .populate(doc, ['author'], (err, doc) => {
          if(err) return console.error(err);
          res.status(200).json(doc);
        })
    })
  })

  // delete by id
  .delete('/event/:id', function(req, res) {
    Event.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  })

module.exports = router;
