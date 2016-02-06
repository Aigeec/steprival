var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var db = require('./mongodb').get();

var handleFitbitResponse = function(accessToken, refreshToken, profile, done) {
  db.collection('user').update(
      { _id: profile.id },
      {
        _id: profile.id,
        displayName:profile.displayName,
        provider: profile.provider,
        profile: profile._json,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      { upsert: true },
      done
    );
};

var handleResponse  = function(accessToken, refreshToken, profile, done) {
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

var misfit = new OAuth2Strategy(
  {
    authorizationURL: 'https://api.misfitwearables.com/auth/dialog/authorize',
    tokenURL: 'https://api.misfitwearables.com/auth/tokens/exchange',
    clientID: process.env.MISFIT_ID,
    clientSecret: process.env.MISFIT_SECRET,
    callbackURL: 'https://steprival.com/auth/misfit/callback',
  },
  handleResponse
);

misfit.name = 'misfit';

var setup = function() {
  passport.use(fitbit);
  passport.use(misfit);
};

module.exports.setup = setup;
