const SearchModel = require('../../api/models/SearchModel');
const cities = require('../../api/maps/cities');
const CitiesInState = require('../../api/cities-in-state');
var ApiRequest = require('../../api/ApiRequest');

let getCity = (mapsResponse) => {
    console.log('google maps Data:', mapsResponse.json);
    // if(mapsResponse.json.status == 'ZERO_RESULTS') // do something
    const stateCode = cities.getStateCode(mapsResponse.json);
    const cityName = cities.getCityName(mapsResponse.json);
    return CitiesInState.getCity(cityName, stateCode);

};

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

    return a.responseBuilder
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
        a =  handlerInput;
        return cities.getState(intentSlots.city.value)
            .then(getCity).then(getHomes).then(createResponse);
    }
}

module.exports = NhsHandler;