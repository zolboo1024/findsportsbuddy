const db = require('./../bin/db-module');

checkDuplicateUsername = (req, res, next) => {
    username = req.body.username;
    console.log(username);
    // Check if username is already in use
    db.query('SELECT id, username, password, type FROM userauth WHERE username=$1', [username], (error, results) => {
        //if it returns an error, return the error
        if (error) {
            res.status(500).send({ message: error.message });
        }
        if (results.rows.length > 0) {
            res.status(400).send({
                message: "username already in use"
            });
        }
        //else, go to the next request
        else {
            next();
        }
    });

};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifySignUp;