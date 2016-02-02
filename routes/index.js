var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Step Rival', messages: req.flash('info') });
});

router.post('/signup', function(req, res) {
  console.log(req.body);
  req.flash('info', 'You\'re interest has been logged. Thank you!');
  res.redirect('/');
});

module.exports = router;
