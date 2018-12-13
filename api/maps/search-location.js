const ApiKey = process.env.GOOGLE_MAPS_KEY || '';

let googleMapsClient = require('@google/maps').createClient({
    key: ApiKey,
    Promise: Promise
  });
  

let getLocationData = async function (cityName) {
    return googleMapsClient.geocode({
      address: cityName,
      region: 'us',
    }).asPromise();
  };

  module.exports = {
      getLocationData
  }