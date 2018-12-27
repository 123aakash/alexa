const Messages = require('./Messages');

class ProgressiveResponse {

    constructor(handlerInput) {
        this.token = handlerInput.context.System.apiAccessToken;
        this.requestId = handlerInput.requestEnvelope.request.requestId;
        this.endpoint = handlerInput.context.System.apiEndpoint;
        this.serviceClientFactory = handlerInput.serviceClientFactory;
    }

    callDirectiveService() {
        const directiveServiceClient = this.serviceClientFactory.getDirectiveServiceClient();
        let requestId = this.requestId;
        const directive = {
            header: {
                requestId,
            },
            directive: {
                type: 'VoicePlayer.Speak',
                speech: `${Messages.DIRECTIVE_SERVICE_MESSAGE}...`,
            },
        };

        return directiveServiceClient.enqueue(directive,this.endpoint,this.token);
    }
}

module.exports = ProgressiveResponse;