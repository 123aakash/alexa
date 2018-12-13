const Request = require('request-promise-native');
const _ = require('lodash');
let googleMapCity = require('./maps/cities');

const requestUrl = 'https://od-api.newhomesource.com/api/v2/Detail/CitiesInState';
let citiesInState = async function (stateCode) {
    return Request.get({
        uri: requestUrl,
        qs: {
            partnerid: 1,
            state: stateCode
        }
    });
};


let filterCity = function (cities, city, stateCode) {
    let low = 0, high = cities.length - 1;
    var r = _.filter(cities, (o) => {
        return o.Name == city
    });
    return r.length ? r[0] : {};
};

let fetchCity = async function (cityName, stateCode) {

    return new Promise(function (resolve, reject) {
        citiesInState(stateCode).then((data) => {
            data = JSON.parse(data);
            //find selected city from cities-in-state API
            resolve(filterCity(data.Result, cityName, stateCode));
        });
    });
};

let getCityDetails = (cityName) => {
    return new Promise(function (resolve, reject) {
        googleMapCity.getState(cityName).then((mapsResponse) => {
            console.log('google maps Data:', mapsResponse.json);
            // if(mapsResponse.json.status == 'ZERO_RESULTS') // do something
            const stateCode = googleMapCity.getStateCode(mapsResponse.json);
            const cityName = googleMapCity.getCityName(mapsResponse.json);
            resolve(fetchCity(cityName, stateCode));
        });
    });
};


module.exports = {
    getCityDetails
};