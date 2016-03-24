var express = require('express');
var router = express.Router();
var users = require('../../app/controllers/users');

// authenticated
router.get('/logout',users.logout);
router.get('/dashboard',users.dashboard);
router.get('/forgotPassword',users.forgotPassword);
router.get('/display',users.display);

module.exports = router;
