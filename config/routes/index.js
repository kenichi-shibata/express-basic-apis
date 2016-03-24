var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Test app by ken',textEntry: 'built using express, mongodb(mongoose), nodejs, and Jade(will be replaced by react soon :)' });
});

module.exports = router;
