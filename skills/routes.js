var express = require('express');
var router = express.Router();
var handler = require('./handlers/handler').handler;

router.post('/', async function (req, res) {
    var data = req.body;
    // console.log(req);
    let context = data.context;
    let event = "event";

    const response = handler(data,data.context); 
    console.log("RESPONSE:",JSON.stringify(response))
    return res.json(response);
});

exports.handler = handler;
module.exports = router;