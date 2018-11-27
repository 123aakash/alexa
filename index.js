const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("Hello");
});
const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 1337, () => console.log('alexa-webhook is listening'));

const APP_ID = 'amzn1.ask.skill.1294b7e3-a0a0-432c-a61a-83d70e04678a';

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

var routes = require('./skills/routes');
app.use('/bot-webhook',routes);

