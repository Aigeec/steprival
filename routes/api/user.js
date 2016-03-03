var express = require('express');
var router = express.Router();
var db = require('../../startup/mongodb').get();
var Promise = require('bluebird');
var https = require('https');
var rest = require('./rest');

router.use(function (req, res, next) {
  req.collection = 'user';
  next();
});

router.get('/:userId/update',
  function (req, res, next) {
    console.log(req.user);
    res.sendStatus(200);
  }
);

router.use(rest);

module.exports = router;
