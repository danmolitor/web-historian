var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var urlParser = require('url');

var actions = {
    'GET': function(request, response) {
      var parts = urlParser.parse(request.url);
      var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
      utils.serveAssets(response, urlPath, function(){
        archive.isUrlInList(urlPath.slice(1), function(found){
          if (found){
            utils.sendRedirect(response, '/loading.html');
          } else {
            utils.send404(response);
          }
        });
      });


    },
    'POST': function(request, response) { //Post requests must collect data
      //If site is archived, we display it.
      //if site isn't archived, then we send them to loading.html
      //append to sites
      utils.collectData(request, function(data){
        var url = data.split('=')[1];
        //is data in sites.txt file?
        console.log(url);
        console.log(data + " is the data")
        archive.isUrlInList(url, function(found){

          if (found){   // If yes
            archive.isUrlArchived(url, function(exists){   // check if it's archived

              if (exists){     // if it's archived,
                  utils.sendRedirect(response, '/' + url);   //display page

                } else { //If it's not
                  utils.sendRedirect(response, '/loading.html');     //display loading
                }
            });

            //if no
          } else {
            archive.addUrlToList(url, function(){  //append to sites

                utils.sendRedirect(response, '/loading.html');  //display loading
            });
          }
        });
      });

    }
};

exports.handleRequest = function (request, response) {
    var action = actions[request.method]; //GET, or POST
    if (action) {
        action(request, response);
    } else {
        utils.sendResponse(response, "Not Found", 404);
    }
};