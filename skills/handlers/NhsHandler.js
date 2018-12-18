const SearchModel = require('../../api/models/SearchModel');
const city = require('../../api/city');
var ApiRequest = require('../../api/ApiRequest');

const Alexa = require('ask-sdk');


let getHomes = (cityObject) => {
    let api = new ApiRequest('');

    console.log("market id:", cityObject.MktId);
    const search = require('../../api/search');
    const query = search.createSearchQurey({ marketid: cityObject.MktId });
    return api.request(...Object.values(query));
};

let createResponse = (data) => {
    console.log('final result data:', data);
    var sm = new SearchModel(JSON.parse(data).Result);

    return handlerInput.responseBuilder
        .speak('Heres some data:' + JSON.stringify(sm.data[0]['HomeId']))
        .withSimpleCard("NONE")
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
        let responseBuilder = handlerInput.responseBuilder;

        return city.getCityDetails(intentSlots.city.value)
            .then(getHomes)
            .then((data) => {
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
                    .speak('Heres some data:' + JSON.stringify(searchModel.data[0]['HomeId']))
                    .withStandardCard('')
                    .getResponse();
            });
    }
}

module.exports = NhsHandler;