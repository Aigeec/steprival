var Promise = require('bluebird');

var passport = require('./passport');
var db = require('./mongodb');

var setup = function() {
  return db.connect().then(function() {
    passport.setup();
  });
};

module.exports = setup;
