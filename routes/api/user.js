var express = require('express');
var router = express.Router();
var db = require('../../startup/mongodb').get();
var Promise = require('bluebird');
var https = require('https');

router.use(function (req, res, next) {
  req.collection = 'user';
  next();
});

router.get('/:userId/steps',
  function (req, res, next) {

  }
);

router.use(rest);



module.exports = router;
