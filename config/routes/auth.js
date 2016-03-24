var express = require('express');
var router = express.Router();
var auth = require('./../../app/controllers/auths');

router.get('/login',auth.loginPage);
router.get('/register',auth.registration);
router.post('/register',auth.register);
router.post('/login',auth.login);

module.exports = router;
