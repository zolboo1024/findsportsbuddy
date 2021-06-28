//API /login
//Zolboo
var express = require('express');
var router = express.Router();
var loginController = require('./../controllers/loginController');
var verifyToken = require('./../middleware/verifyToken');
require('dotenv').config();

//login router
router.post('/', loginController);

//test to check if the token can be verified
router.get('/verifyToken', verifyToken, (req, res, next) => {
    console.log(req.userId);
    return res.status(200).send({
        message: "token successfully verified"
    });
});
module.exports = router;
