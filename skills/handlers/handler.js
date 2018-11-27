const Alexa = require('ask-sdk');

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
var handler = function (event, context) {
    // console.log(`REQUEST++++${JSON.stringify(event)}`);

    // HelloWorldIntentHandler,
    //       HelpIntentHandler,
    //       CancelAndStopIntentHandler,
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                SessionEndedRequestHandler,
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    }

    const response = skill.invoke(event, context);
    // console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};

exports.handler = handler;