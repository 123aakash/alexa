const Alexa = require('ask-sdk');


const HelloWorldHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
      const speechText = 'Hello World!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Hello World', speechText)
        .getResponse();
    }
  };

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};


const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, I can\'t understand the command. Please say again.')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
  };

var skill = null;
var handler = async function (event) {
    // console.log(`REQUEST++++${JSON.stringify(event)}`);

    // HelloWorldIntentHandler,
    //       HelpIntentHandler,
    //       CancelAndStopIntentHandler,
    if (!skill) {
        console.log("SKILL creating");
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                HelloWorldHandler
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    }

     skill.invoke(event).then((abc)=>{
        console.log("Actual RESPONSE:",JSON.stringify(abc))
        return abc;
     });
};

exports.handler = handler;