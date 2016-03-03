var express = require('express');
var router = express.Router();
var db = require('../../startup/mongodb').get();
var Promise = require('bluebird');
var rest = require('./rest');

router.use(function (req, res, next) {
  req.collection = 'rivalries';
  next();
});

router.use(rest);

module.exports = router;
