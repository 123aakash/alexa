var express = require('express');
var router = express.Router();
var handler = require('./handlers/handler').handler;

router.post('/', async function (req, res) {
    var data = req.body;
    // console.log(req);
    let context = data.context;

    const response = await handler(data, data.context);
    console.log("response to alexa:", JSON.stringify(response));
    res.status(200);
    res.json(response);
});

module.exports = router;