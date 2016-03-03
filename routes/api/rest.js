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
      defaultResponse(err, res);
    });
  }
);

router.put('/:itemId',
  function (req, res, next) {
    db.collection(req.collection).update({
        _id: new ObjectID(req.params.itemId),
      }, req.body, function (err, result) {
      defaultResponse(err, res);
    });
  }
);

function defaultResponse(err, res) {
  if (err) {
    console.error('Error processing REST req: ', err);
    res.sendStatus(500);
  } else {
    res.sendStatus(204);
  }
}

module.exports = router;
