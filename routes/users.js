var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { user: req.user, messages: req.flash('info') });
});

module.exports = router;
