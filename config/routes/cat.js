var express = require('express');
var router = express.Router();
var cat = require('./../../app/controllers/cats');
/* GET home page. */

router.get('/',cat.getCat);
router.get('/list',cat.getList);
router.get('/size/:size',cat.size);
router.get('/category/:category',cat.category);
router.get('/clear/:type',cat.clear);
router.get('/next',cat.getNext);
module.exports = router;
