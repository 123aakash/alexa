const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("Hello");
});
const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`alexa-webhook is listening on port ${port} env ${process.env.NODE_ENV}`));

const APP_ID = 'amzn1.ask.skill.1294b7e3-a0a0-432c-a61a-83d70e04678a';

//TODO: do amazon alexa REQUEST checking 
// const SKILL_NAME = 'Alexa NHS Skill';

var routes = require('./skills/routes');
app.use('/bot-webhook',routes);

