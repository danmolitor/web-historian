var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var urlParser = require('url');

var actions = {
    'GET': function(request, response) {
      var parts = urlParser.parse(request.url);
      var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
      utils.serveAssets(response, urlPath);


    },
    'POST': function(request, response) {
      utils.serveAssets(response);

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
        utils.sendResponse(response, "Not Found", 404);
    }
};