var passport = require('passport');
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/fitbit', passport.authenticate('fitbit', { scope: ['profile', 'activity'] }));

var directToUsersPage = function (req, res) {
  res.redirect('/user/' + req.user._id);
};

var addFitbitSubscription = function (req, res) {
  request
    .post('/1/user/-/apiSubscriptions/1.json')
    .auth(null, null, true, user.accessToken)
    .on('response', function (err, fitbitRes, body) {
      if (err) {
        console.log('Error: Could not add subscription. ', err);
      }

      directToUsersPage(req, res);
    });
};

router.get('/fitbit/callback',
  passport.authenticate('fitbit', { failureRedirect: '/login' }),
  addFitbitSubscription
);

router.get('/misfit', passport.authenticate('misfit'));

router.get('/misfit/callback',
  passport.authenticate('misfit', { failureRedirect: '/login' }),
  directToUsersPage
);

module.exports = router;
