let searchLocation = require('./search-location').getLocationData;


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
  getState: searchLocation,
  getStateCode,
  getCityName,
};