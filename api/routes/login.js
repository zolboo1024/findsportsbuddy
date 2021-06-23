var express = require('express');
var router = express.Router();
var passport = require('./../bin/passport');
var db = require('./../bin/db-module');

require('dotenv').config();

//login router
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        db.query('SELECT id, username, password, type FROM userauth WHERE username=$1 AND password=$2', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                console.log('user verified');
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

module.exports = router;
