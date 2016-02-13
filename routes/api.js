var express = require('express');
var router = express.Router();
var db = require('../startup/mongodb').get();
var Promise = require('bluebird');

/* GET users listing. */
router.post('/endpoint/misfit',
  function(req, res, next) {
    processMessages(req.body.Messages, res);
  }
);

router.post('/endpoint/fitbit',
  function(req, res, next) {    
    processMessages(req.body, res);
  }
);

var processMessages = function(messages, res){
    var promises = messages.map(processMessage);
    respondOnCompletion(promises, res);
}

var respondOnCompletion = function(res, promises){
  Promise.all(promises).then(
    function(){
      res.sendStatus(204);
    }
  ).catch(function(){
    res.sendStatus(500);
  }); 
}

router.get('/endpoint/fitbit',
  function(req, res, next) {
    if(req.query.verify === 'ecc7e5e6c0370d5d0067d98ea06c8fac93440f412ea5653adf277fb02b2f90e2'){
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

var processMessage = function(message){

    var deferred = Promise.defer();

    db.collection('data').insert(      
      message,      
      function(err, records) {        
        resolve(deferred, err, records);
      }
    );

    return deferred.promise;
}

var resolve = function(deferred, err, data){
  if(err){
    deferred.reject(err);
  } else {
    deferred.resolve(data);
  }
}

module.exports = router;
