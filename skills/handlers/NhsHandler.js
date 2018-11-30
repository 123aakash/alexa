const mUrl =
    "https://api.newhomesource.com/api/v2/Search/Homes?partnerid=1&City=austin&SortBy=Random&SortSecondBy=None&bed=2&marketid=269";
const SearchModel = require('../../api/models/SearchModel');

const NhsHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'find_homes';
    },
    handle(handlerInput) {
        const speechText = 'Searching for homes';
            // + JSON.stringify(handlerInput.attributesManager.getSessionAttributes())
            // + JSON.stringify(handlerInput.attributesManager.getRequestAttributes())
            // + JSON.stringify(handlerInput.requestEnvelope.request.intent);

        var api = new require('../../api/ApiRequest');
        api = new api(mUrl);

        return api.request(mUrl).then(function (data) {
            var sm = new SearchModel(JSON.parse(data).Result);
            // console.log("Result from api",JSON.stringify(sm));

            return handlerInput.responseBuilder
                .speak('Heres some data:'+JSON.stringify(sm.data[0]['HomeId']))
                .withSimpleCard("NONE")
                .getResponse();
        });

    }
}

module.exports = NhsHandler;