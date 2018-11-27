var express = require('express');
var router = express.Router();
var handler = require('./handlers/handler').handler;

router.post('/', async function (req, res) {
    var data = req.body;
    return res.json(data);
    // console.log(req);
    let context = data.context;
    let event = "event";

    const response = await handler(data, data.context);
    console.log("aakash:",response);
});

module.exports = router;