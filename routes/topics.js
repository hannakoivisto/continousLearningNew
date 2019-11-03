var express = require('express');
var router = express.Router();
var topics = []

var palvelu = require("./topicscontroller");

router.route('/')
  .get((req, res, next) => {
    // topics.push({
    //   id: '',
    //   title: '',
    //   description: '',
    //   time: '',
    //   spent: '',
    //   source: '',
    //   date: '',
    //   completion: ''
    // })
    palvelu.getAll(function (results) {
      res.json(results);
    });
    //res.json(topics);
  });

router.get('/:id', function (req, res) {
  palvelu.getSingleTopic(req, function (results) {
    res.json(results)
  });
});

router.post('/', function (req, res) {
  palvelu.createTopic(req, function () {
    res.status(201)
      .end();
  });
});

router.put('/:id', function (req, res) {
  palvelu.updateUser(req, function () {
    res.status(200)
      .end();
  });
});

router.delete('/:id', function (req, res) {
  palvelu.removeUser(req, res, function () {
  });
});

module.exports = router;
