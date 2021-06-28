//creates a JWT from username and PW so that it can be verified
//Zolboo
const db = require('../bin/db-module');
require('dotenv').config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//login controller
login = (req, res) => {
    //info to validate
    username = req.body.username;
    password = req.body.password;
    var user;
    //make a query
    db.query('SELECT id, username, password, type FROM userauth WHERE username=$1', [username], (error, results) => {
        if (error) {
            return res.status(500).send({ message: error.message + " at login controller" });
        }
        else if (results.rows.length <= 0) {
            return res.status(400).send({ message: "invalid username" });
        }
        //if the user exists
        user = results.rows[0];
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
        jwt_secret_key = process.env.JWT_SECRET || 'dev_secret';
        //prepare the token
        var token = jwt.sign({ id: user.id }, jwt_secret_key, {
            expiresIn: 8640000 // 2400 hours
        });

        //send back the token
        //userinfo might be useful later
        return res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        });
    });
};

module.exports = login;