const db = require('../bin/db-module');
require('dotenv').config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//login controller
exports.signin = (req, res) => {
    //info to validate
    username = req.body.username;
    password = req.body.password;
    var user;
    //make a query
    db.query('SELECT id, username, password, type FROM userauth WHERE username==$1', [username], function (error, results, fields) {
        if (error) {
            res.status(500).send({ message: error.message + " loginController" });
        }
        if (results.rows <= 0) {
            return res.status(400).send({ message: "invalid username" });
        }
        user = results.rows[0];
    });
    //user object holds the user information including id, password and type

    //check if the password is valid
    var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    //prepare the token
    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 8640000 // 2400 hours
    });

    //send back the token
    //userinfo might be useful later
    res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
    });
};