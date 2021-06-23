var express = require('express');
var router = express.Router();
var verifyRegister = require('./../middleware/verifyRegister');
var registerController = require('./../controllers/registerController');

//we dont even need a separate middleware here since the two existing ones handle
//everything we need
router.post('/', verifyRegister.checkDuplicateUsername, registerController);

module.exports = router;
