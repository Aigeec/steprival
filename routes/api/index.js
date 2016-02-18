var express = require('express');
var router = express.Router();
var db = require('../../startup/mongodb').get();
var endpoints = require('./endpoints');
var user = require('./user');

router.use('/endpoint', endpoints);

router.use(function(req, res, next) {

  db.collection('user').findOne({ _id: '32GPPJ' }, function(err, user) {
    req.user = user;
    next();
  });

  // if (!req.user) {
  //   res.redirect('/login');
  // }else {
  //   next();
  // }
});

router.use('/user', user);

module.exports = router;
