var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/fitbit', passport.authenticate('fitbit', { scope: ['profile', 'activity'] }));

var directToUsersPage = function(req, res) {
  res.redirect('/user/' + req.user._id);
};

router.get('/fitbit/callback',
  passport.authenticate('fitbit', { failureRedirect: '/login' }),
  directToUsersPage
);

router.get('/misfit', passport.authenticate('misfit'));

router.get('/misfit/callback',
  passport.authenticate('misfit', { failureRedirect: '/login' }),
  directToUsersPage
);

module.exports = router;
