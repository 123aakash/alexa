//TODO: place in config file
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

let searchFor = function (data, placeType) {
  const components = data.results[0].address_components;
  for (item of components) {
    if (item.types.indexOf(placeType) != -1) {
      return item;
    }
  }
  return "NOT_FOUND";
};


let getStateCode = function (data) {
  let item = searchFor(data, 'administrative_area_level_1');
  return item.short_name;
};

let getCityName = function (data) {
  let item = searchFor(data, 'locality');
  return item.long_name;
};

module.exports = {
  getState: getLocationData,
  getStateCode,
  getCityName
};