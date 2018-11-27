var express = require('express');
var router = express.Router();
const Alexa = require('ask-sdk');
var handler = require('./handlers/handler').handler;



var skill;
router.post('/', async function (req, res) {
    var data = req.body;
    // console.log(req);
    let context = data.context;
    let event = "event";

    let response = handler(data,data.context); 
    return res.json(response);
});

module.exports = router;