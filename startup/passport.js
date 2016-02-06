var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;

var handleResponse = function(accessToken, refreshToken, profile, done) {
  //create user here and return via done
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);
  console.log('profile:', profile);
  done(err);
};

var fitbit = new OAuth2Strategy(
  {
    authorizationURL: 'https://www.fitbit.com/oauth2/authorize',
    tokenURL: 'https://api.fitbit.com/oauth2/token',
    clientID: process.env.FITBIT_ID,
    clientSecret: process.env.FITBIT_SECRET,
    callbackURL: 'https://steprival.com/auth/fitbit/callback',
    customHeaders: {
      Authorization:  'Basic ' + new Buffer(process.env.FITBIT_ID + ':' + process.env.FITBIT_SECRET).toString('base64'),
    },
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
