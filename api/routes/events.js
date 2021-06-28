//API for /events that would handle all the event-related info
//Zolboo
var express = require('express');
var router = express.Router();
var db = require('./../bin/db-module');
var verifyToken = require('./../middleware/verifyToken');

require('dotenv').config();
//gets all the events that was created
router.get('/getAll', (req, res) => {
    db.query('SELECT id, host, sport_type, location, start_time, end_time, participants, description FROM events',
        [], (error, results) => {
            if (error) {
                return res.status(500).send({ message: error.message + " get all events" });
            }
            //return all the events
            return res.status(200).send(results.rows);
        });
});
//authentication required to create events
router.post('/create', verifyToken, (req, res) => {
    //save the required parameters
    var host = req.userId;
    var sport = req.body.sport;
    var location = req.body.location;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var participants = req.body.participants;
    var description = req.body.description;
    //if any data value is missing, the event can't be created
    if (!host || !sport || !location || !start_time || !end_time || !participants || !description) {
        return res.status(400).send({
            message: "missing parameters"
        });
    }
    db.query('INSERT INTO events (host, sport_type, location, start_time, end_time, participants, description) values ($1, $2, $3, $4, $5, $6, $7)',
        [host, sport, location, start_time, end_time, participants, description], (error, results) => {
            if (error) {
                return res.status(500).send({ message: error.message + " createEvent" });
            }
            return res.status(200).send({
                message: "successful! event created."
            });
        });
});

module.exports = router;
