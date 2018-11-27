const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("Hello");
});
const port = process.env.PORT || 3000;
app.listen(port,(err)=>{
    console.log(`Listening on port ${port}`);    
});