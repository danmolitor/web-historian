var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var urlParser = require('url');

var actions = {
    'GET': function(request, response) {

      response.end(archive.paths.indexHTML);
    },
    'POST': function(request, response) {
      httpHelpers.serveAssets(response);

    },
    // 'OPTIONS': function(request, response) {
    //     utils.sendResponse(response, null);
    // }
};

exports.handleRequest = function (request, response) {
    var action = actions[request.method]; //GET, or POST
    if (action) {
        action(request, response);
    } else {
        httpHelpers.sendResponse(response, "Not Found", 404);
    }
};