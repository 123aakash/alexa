const Alexa = require('ask-sdk');
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

app.post('/bot-webhook', (req, res) => {
    let body = req.body;
    console.log(body);
  
    var sessionId = body.sessionId;
    var requestType = body.requestType;
    var botResponse = body.msg;
    var responseObj = {};
  
    switch (requestType) {
  
      case "LaunchRequest":
        responseObj = {
          sessionId: sessionId,
          alexaResponse: {
            version: "string",
            response: {
              outputSpeech: {
                type: 'PlainText',
                text: "Hi, I am happy that you are here. maverickjoy welcomes you."
              },
              reprompt: {
                outputSpeech: {
                  type: "PlainText",
                  text: "Would you like me to repeat"
                }
              },
              shouldEndSession: false
            }
          }
        }
        break;
  
      case "IntentRequest":
        responseObj = {
          sessionId: sessionId,
          alexaResponse: {
            version: "string",
            response: {
              outputSpeech: {
                type: 'PlainText',
                text: botResponse
              },
              reprompt: {
                outputSpeech: {
                  type: "PlainText",
                  text: "Would you like me to repeat"
                }
              },
              shouldEndSession: false
            }
          }
        }
        break;
  
      case "StopRequest":
        responseObj = {
          sessionId: sessionId,
          alexaResponse: {
            version: "string",
            response: {
              outputSpeech: {
                type: 'PlainText',
                text: "Thank You for Talking To maverickjoy. Bye"
              },
              reprompt: {
                outputSpeech: {
                  type: "PlainText",
                  text: "Would you like me to repeat"
                }
              },
              shouldEndSession: true
            }
          }
        }
        break;
  
      default:
        responseObj = {
          sessionId: sessionId,
          alexaResponse: {
            version: "string",
            response: {
              outputSpeech: {
                type: 'PlainText',
                text: "Unknown-Type"
              },
              reprompt: {
                outputSpeech: {
                  type: "PlainText",
                  text: "Would you like me to repeat"
                }
              },
              shouldEndSession: false
            }
          }
        }
  
    }
  
    return res.json(responseObj);
  
  });
  
