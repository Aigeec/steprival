var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/fitbit', passport.authenticate('fitbit', { scope: ['profile', 'activity'] }));

router.get('/fitbit/callback',
  passport.authenticate('fitbit', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/users');
  }
);

router.get('/misfit', passport.authenticate('misfit'));

router.get('/misfit/callback',
  passport.authenticate('misfit', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/users');
  }
);

module.exports = router;
