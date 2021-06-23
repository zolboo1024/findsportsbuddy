const db = require('./../bin/db-module');
require('dotenv').config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//register controller
signup = (req, res) => {
    //info to register
    username = req.body.username;
    password = bcrypt.hashSync(req.body.password, 8);
    // Save User to Database with the password as hashed
    db.query('INSERT INTO userauth(username, password, type) VALUES ($1, $2, user)', [username, password], function (error, results, fields) {
        if (error) {
            res.status(500).send({ message: error.message + " registerController" });
        }
        else {
            res.status(200).send({ message: "user was registered successfully" });
        }
    });
};

module.exports = signup;