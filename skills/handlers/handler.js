const Alexa = require('ask-sdk');

const NhsHandler = require('./NhsHandler');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the NHS Home finder! How Can I help';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('N.H.S.', speechText)
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
var handler = async function (event, context) {
    
    if (!skill) {
        console.log("SKILL creating");
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                NhsHandler,
                LaunchRequestHandler,
                SessionEndedRequestHandler,
            )
            .addErrorHandlers(ErrorHandler)
            .withApiClient(new Alexa.DefaultApiClient())
            .create();
    }

    return skill.invoke(event, context);
};

exports.handler = handler;