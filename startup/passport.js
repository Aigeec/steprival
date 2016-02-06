var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;;

var handleResponse = function(accessToken, refreshToken, profile, done) {
  //create user here and return via done
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);
  console.log('profile:', profile);
  done();
};

var fitbit = new FitbitStrategy(
  {
    clientID: process.env.FITBIT_ID,
    clientSecret: process.env.FITBIT_SECRET,
    callbackURL: 'https://steprival.com/auth/fitbit/callback',
  },
  handleResponse
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
