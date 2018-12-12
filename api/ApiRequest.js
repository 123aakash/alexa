const Request = require('request-promise-native');
const mUrl = 'https://api.newhomesource.com/api/v2/Search/Homes';
class ApiRequest {

    constructor(url) {
        this.url = url;
    }

    request(url,params) {
        return Request.get({
            uri:url,
            qs:params
        });
    }
}

module.exports = ApiRequest;