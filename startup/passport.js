var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var mongodb = require('./mongodb');
var db;

var handleFitbitResponse = function(accessToken, refreshToken, profile, done) {

  var user = {
    _id: profile.id,
    displayName:profile.displayName,
    provider: profile.provider,
    profile: profile._json,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  db.collection('user').update(
      { _id: user._id },
      user,
      { upsert: true },
      function(err, records) {
        done(err, user);
      }
    );
};

var handleMisfitResponse  = function(accessToken, refreshToken, profile, done) {
  done();
};

var fitbit = new FitbitStrategy(
  {
    clientID: process.env.FITBIT_ID,
    clientSecret: process.env.FITBIT_SECRET,
    callbackURL: 'https://steprival.com/auth/fitbit/callback',
  },
  handleFitbitResponse
);

var misfit = new MisfitStrategy(
  {
    clientID: process.env.MISFIT_ID,
    clientSecret: process.env.MISFIT_SECRET,
    callbackURL: 'https://steprival.com/auth/misfit/callback',
  },
  handleMisfitResponse
);

misfit.name = 'misfit';

var setup = function() {
  db = mongodb.get();
  passport.use(fitbit);
  passport.use(misfit);

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    db.collection('user').findOne({ _id: id }, function(err, user) {
      done(err, user);
    });
  });
};

module.exports.setup = setup;
