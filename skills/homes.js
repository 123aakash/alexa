var express = require('express');
var router = express.Router();
const Alexa = require('ask-sdk');


router.post('/',function(req, res){
    var req = req.body;
    console.log(req);
});

modules.export = router;