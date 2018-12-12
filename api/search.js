const searchUrl = "https://api.newhomesource.com/api/v2/Search/Homes";
// ?partnerid=1&City=austin&SortBy=Random&SortSecondBy=None&bed=2&marketid=269";

const defaultParams = {
    partnerid: 1,
};

let createSearchQurey = function (inputParams) {
    let params = Object.assign(defaultParams, inputParams);
    return {searchUrl, params};
};

module.exports = {
    createSearchQurey
}