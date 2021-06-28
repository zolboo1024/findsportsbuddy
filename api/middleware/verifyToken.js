//verifies the JSON web token
//Zolboo
const jwt = require("jsonwebtoken");
require('dotenv').config();

verifyToken = (req, res, next) => {

    //check if the header is present
    if (req.headers["x-access-token"] == null) {
        return res.status(400).send({
            message: "token not provided"
        });
    }

    //get the token
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt_secret = process.env.JWT_SECRET || "dev_secret";
    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        //save the user ID
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;