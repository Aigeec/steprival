var express = require('express');
var router = express.Router();
var db = require('../../startup/mongodb').get();
var Promise = require('bluebird');
var https = require('https');

router.get('',
  function(req, res, next) {
    db.collection('user').find().toArray(function(err, users) {
      res.json(users);
    });
  }
);

router.get('/:userId',
  function(req, res, next) {
    db.collection('user').findOne({ _id: req.params.userId }, function(err, user) {
      res.json(user);
    });
  }
);

router.get('/:userId/steps',
  function(req, res, next) {

  }
);

module.exports = router;
