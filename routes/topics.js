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
    //kutsu funktiota
    palvelu.getAll(function (results) {
      res.json(results);
    });
    //res.json(topics);
  });

router.post('/', function (req, res) {
  palvelu.createTopic(req, function () {
    res.status(201)
      .end();
  });
});


/*
.post((req, res) => {
  const data = req.body;
  console.log(data);
  topics.push(data);
  res.status(201)
    .location('/' + 100)
    .send();
});
*/

/*
router.get('/api/topics', function (req, res, next) {
  console.log("/api/users toimii");
  palvelu.haeKaikki(function (results) {
    res.json(results);
  });
});*/
/*
router.put('/api/topics/:id', function (req, res) {
  palvelu.paivitaKayttaja(req, function () {
    res.status(200)
      .end();
  });
})
*/

module.exports = router;
