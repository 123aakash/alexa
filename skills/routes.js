var express = require('express');
var router = express.Router();
var handler = require('./handlers/handler').handler;

router.post('/', async function (req, res) {
    var data = req.body;
    // console.log(req);
    let context = data.context;
    let event = "event";

    const response = await handler(data);
    // .then((abc)=>{
    //     console.log("Actual RESPONSE:",JSON.stringify(abc))
    //     return res.json(abc);
    //  }); 
});

exports.handler = handler;
module.exports = router;