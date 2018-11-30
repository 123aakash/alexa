const Request = require('request-promise-native');

class ApiRequest {

    constructor(url) {
        this.url = url;
    }

    request(url) {
        return Request.get({uri:url});
    }
}

module.exports = ApiRequest;