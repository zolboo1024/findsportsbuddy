//API for /events that would handle all the event-related info
//Author: Zolboo Erdenebaatar
var express = require('express');
var router = express.Router();
var db = require('./../bin/db-module');
var verifyToken = require('./../middleware/verifyToken');

require('dotenv').config();
//gets all the events that was created
router.get('/getAll', (req, res) => {
    console.log('request received')
    db.query('SELECT id, host, sport_type, location, start_time, end_time, participants, num_participants, description FROM events',
        [], (error, results) => {
            if (error) {
                return res.status(500).send({ message: error.message + " get all events" });
            }
            //return all the events
            return res.status(200).send(results.rows);
        });
});
//authentication required to create events
router.post('/create', (req, res) => {
    console.log('request received')
    //save the required parameters
    var host = req.body.userId;
    var sport = req.body.sport;
    var location = req.body.location;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var participants = req.body.participants;
    var num_participants = req.body.num_participants;
    var description = req.body.description;
    //if any data value is missing, the event can't be created
    if (!host || !sport || !location || !start_time || !end_time || !participants || !num_participants || !description) {
        return res.status(400).send({
            message: "missing parameters"
        });
    }
    db.query('INSERT INTO events (host, sport_type, location, start_time, end_time, participants, num_participants, description) values ($1, $2, $3, $4, $5, $6, $7, $8)',
        [host, sport, location, start_time, end_time, participants, num_participants, description], (error, results) => {
            if (error) {
                return res.status(500).send({ message: error.message + " createEvent" });
            }
            return res.status(200).send({
                message: "successful! event created."
            });
        });
});

module.exports = router;
