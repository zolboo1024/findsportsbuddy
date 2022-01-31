//Router that handles root request
//Author: Zolboo Erdenebaatar

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("root works");
});

module.exports = router;
