const SearchModel = require('../../api/models/SearchModel');
const city = require('../../api/city');
var ApiRequest = require('../../api/ApiRequest');

const Alexa = require('ask-sdk');
const ProgressiveResponse = require('../progressive-response').default;


let getHomes = (cityObject) => {
    let api = new ApiRequest('');

    console.log("market id:", cityObject.MktId);
    const search = require('../../api/search');
    const query = search.createSearchQurey({ marketid: cityObject.MktId });
    return api.request(...Object.values(query));
};

let createResponse = function (handlerInput, data) {

    let responseBuilder = handlerInput.responseBuilder;
    var searchModel = new SearchModel(JSON.parse(data).Result);
    console.log('final result data:', searchModel);

    let homeList = [];
    searchModel.data.forEach((home) => {
        const homeImage = new Alexa.ImageHelper().withDescription(`Home Image`);
        homeImage.addImageInstance(home.Thumb1);

        homeList.push({
            token: home.HomeId,
            textContent: new Alexa.PlainTextContentHelper()
                .withPrimaryText(home.PlanName)
                .withSecondaryText(`Abbreviation: ${home.HomeId}`)
                .withTertiaryText(`Capital: ${home.CommName}`)
                .getTextContent(),
            image: homeImage.getImage()

        });
    });

    responseBuilder.addRenderTemplateDirective({
        type: `ListTemplate1`,
        token: 'listToken',
        backButton: 'hidden',
        title: `I list things like this:`,
        listItems: homeList,
    });

    return responseBuilder
        .speak('I found these homes')
        .withStandardCard('')
        .getResponse();
};

const NhsHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'find_homes';
    },
    handle(handlerInput) {
        const speechText = 'Searching for homes';
        const intentSlots = handlerInput.requestEnvelope.request.intent.slots;

        let progressiveResponse = new ProgressiveResponse(handlerInput);
        try {
            progressiveResponse.callDirectiveService();
        } catch (error) {

        }
        return city.getCityDetails(intentSlots.city.value)
            .then(getHomes)
            .then((data) => {   
                return createResponse(handlerInput, data);
            });
    }
}

module.exports = NhsHandler;