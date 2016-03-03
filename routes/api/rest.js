var express = require('express');
var router = express.Router();
var db = require('../../startup/mongodb').get();
var ObjectID = require('mongodb').ObjectID;
var Promise = require('bluebird');

router.get('',
  function (req, res, next) {
    db.collection(req.collection).find()
    .toArray(function (err, list) {
      res.json(list);
    });
  }
);

router.get('/:itemId',
  function (req, res, next) {
    db.collection(req.collection).findOne({
      _id: new ObjectID(req.params.itemId),
    }, function (err, item) {
      res.json(item);
    });
  }
);

router.post('',
  function (req, res, next) {
    db.collection(req.collection).insert(
      req.body, function (err, result) {
        console.log(result);
        defaultResponse(err, result, res);
      });
  }
);

router.put('/:itemId',
  function (req, res, next) {
    db.collection(req.collection).update({
        _id: new ObjectID(req.params.itemId),
      }, req.body, function (err, result) {
      defaultResponse(err, result, res);
    });
  }
);

function defaultResponse(err, result, res) {
  if (err) {
    console.error('Error processing REST req: ', err);
    res.sendStatus(500);
  } else {
    res.json(result.ops[0]);
  }
}

module.exports = router;
