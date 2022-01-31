//test example API
//Author: Zolboo Erdenebaatar
var express = require('express');
var router = express.Router();
var db = require('./../bin/db-module');

require('dotenv').config();

router.get('/', function (req, res, next) {
    console.log("made it here")
    db.query('SELECT * from events', [], (err,results) => {
        if(err) {
             res.send("error occurred")
        }
        else {
             res.send("no error occurred")
        }
    })
});

//test query on the test table users
router.get('/getusers', function (req, res, next) {
    db.query('SELECT id, username, password, type FROM userauth WHERE username=$1', ['f'], (error, results, fields) => {
        if (error) {
            return res.status(500).send({ message: error.message + " loginController" });
        }
        if (results.rows <= 0) {
            return res.status(400).send({ message: "invalid username" });
        }
        user = results.rows[0].password;
        return res.status(200).send(user);;
    });
});
module.exports = router;
