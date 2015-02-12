'use strict';

var pkg = require('../package.json');

var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: pkg.name,
  streams: [
    { level: 'info', stream: process.stdout },          // log INFO and above to stdout
    { level: 'error', path: '../logs/' + pkg.name + '.log'},         // log ERROR and above to a file
    { level: 'debug', path: '../logs/' + pkg.name + '-debug.log'},   // log DEBUG and above to a debug file
  ]
});

log.info('starting "' + pkg.name + '" app version ' + pkg.version);
