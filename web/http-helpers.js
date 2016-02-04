var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

//Reading and sending of files here.
exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var repondedData;
  if (asset === "archive.paths.indexHTML"){
    sendResponse(response, JSON.parse(archive.paths.indexHTML));
  }

};



// As you progress, keep thinking about what helper functions you can put here!


var sendResponse = function(response, data, statusCode) {
    statusCode = statusCode || 200;
    response.writeHead(statusCode, headers);
    response.end(data);
};

exports.collectData = function(req, callback) {
    var data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        callback(data);
    });
};
