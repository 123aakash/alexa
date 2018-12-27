const Messages = require('./Messages');

class ProgressiveResponse {

    constructor(handlerInput) {
        this.token = handlerInput.context.System.apiAccessToken;
        this.requestId = handlerInput.request.requestId;
        this.endpoint = handlerInput.context.System.apiEndpoint;

    }

    callDirectiveService() {
        const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();

        const directive = {
            header: {
                this.requestId,
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