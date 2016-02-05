var MongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird');

// Connection URL
var url = 'mongodb://192.168.192.47:27017/steprival';

var state = {
  db: null,
};

var connect = function() {
  var deferred  = Promise.defer();

  MongoClient.connect(url, function(err, db) {
    if (err) {
      consolge.log(err);
      deferred.reject(err);
    }else {
      console.log('Connected correctly to server');
      state.db = db;
      deferred.resolve(db);
    }
  });

  return deferred.promise;
};

var close = function() {
  var deferred  = Promise.defer();
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      if (err) {
        deferred.reject(err);
      }else {
        deferred.resolve();
      }
    });
  }

  return deferred.promise;
};

module.exports.get = function() { return state.db; };

module.exports.connect = connect;
module.exports.close = connect;
