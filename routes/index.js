var express = require('express');
var router = express.Router();
var user = require('./user');
var api = require('./api');
var auth = require('./auth');
var db = require('../startup/mongodb').get();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Step Rival', messages: req.flash('info') });
});

router.post('/signup', function(req, res) {
  console.log(req.body);
  req.flash('info', 'You\'re interest has been logged. Thank you!');
  res.redirect('/');
});

router.get('/login', function(req, res) {
  res.render('login', { messages: req.flash('info') });
});

router.use('/auth', auth);
router.use('/api', api);

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
