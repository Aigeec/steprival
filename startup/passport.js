var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;

var handleResponse = function(accessToken, refreshToken, profile, done) {
  //create user here and return via done
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', accessToken);
  console.log('profile:', accessToken);
  done(err);
};

var fitbit = new OAuth2Strategy(
  {
    authorizationURL: 'https://www.fitbit.com/oauth2/authorize',
    tokenURL: 'https://api.fitbit.com/oauth2/token',
    clientID: process.env.FITBIT_ID,
    clientSecret: process.env.FITBIT_SECRET,
    callbackURL: 'https://steprival.com/auth/fitbit/callback',
    scope: 'profile activity',
  },
  handleResponse);

fitbit.name = 'fitbit';

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
