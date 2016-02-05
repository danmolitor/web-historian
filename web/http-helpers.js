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

// As you progress, keep thinking about what helper functions you can put here!


exports.sendResponse = function(response, data, statusCode) {
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

exports.send404 = function(response){
  exports.sendResponse(response, '404: Page not found', 404);
};


//Reading and sending of files here.
exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var encoding = {encoding: 'utf8'};

  //1. Check in public folder
  //2. Then check in archived sites.
  fs.readFile( archive.paths.siteAssets + asset, encoding, function(err, data){
    if (err) {
      fs.readFile ( archive.paths.archivedSites + asset, encoding, function(err, data){
        if (err){
          callback ? callback() : exports.send404(response);
        } else {
          exports.sendResponse(response, data);
        }
      });
    } else {
      exports.sendResponse(response, data);
    }
  });
};

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {location: location});
  response.end();
};