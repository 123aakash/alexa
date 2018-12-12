const Request = require('request-promise-native');
const _ = require('lodash');
const arrays = require('../api/utils/utils').arrays;

const requestUrl = 'https://od-api.newhomesource.com/api/v2/Detail/CitiesInState';
let getCities = async function (stateCode) {
    return Request.get({
        uri: requestUrl,
        qs: {
            partnerid: 1,
            state: stateCode
        }
    });
};


let filterCity = function (cities, city, stateCode) {
    let low = 0, high = cities.length-1;
    var r = _.filter(cities, (o)=>{
       return o.Name == city
    });
    return r.length?r[0]:{};
};

let getCity = async function (cityName, stateCode) {

    return new Promise(function (resolve, reject) {
        getCities(stateCode).then((data) => {
            data = JSON.parse(data);
            resolve(filterCity(data.Result, cityName, stateCode));
        });
    });
};


module.exports = {
    getCity
};