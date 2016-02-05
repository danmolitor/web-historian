// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var CronJob = require('cron').CronJob;
var request = require('request');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var path = require('path');

archive.readListOfUrls(archive.downloadUrls());

fs.appendFile(__dirname + '/log.txt', 'cron job executed at' + new Date() + '\n', function(err, written, string) {});