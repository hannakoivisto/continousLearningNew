var express = require('express');
var router = express.Router();
var topics = []

router.route('/')
  .get((req, res, next) => {
    topics.push({
      id: '',
      title: '',
      description: '',
      time: '',
      spent: '',
      source: '',
      date: '',
      completion: ''
    })
    res.json(topics);
  })
  .post((req, res) => {
    const data = req.body;
    console.log(data);
    topics.push(data);
    res.status(201)
      .location('/' + 100)
      .send();
  });

module.exports = router;
