var Promise = require('bluebird');

var passport = require('./passport');
var db = require('./mongodb');

var setup = function() {
  passport.setup();
  return db.connect();
};

module.exports = setup;
