//exports the db so that it can be used in other modules
//Author: Zolboo Erdenebaatar
require('dotenv').config();
//set up the connection to the DB
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
pool.on('error', function (err) {
    winston.error('idle client error', err.message, err.stack)
});
//this file exports a file with query function:
//i.e. import db-module, then db.query(command)
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}
