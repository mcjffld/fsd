'use strict';

var pkg = require('../package.json');

var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: pkg.name,
  streams: [
    { level: 'info', stream: process.stdout },          // log INFO and above to stdout
//    { level: 'error', path: 'logs/' + pkg.name + '.log'},         // log ERROR and above to a file
//    { level: 'debug', path: 'logs/' + pkg.name + '-debug.log'},   // log DEBUG and above to a debug file
//    { type: 'rotating-file', path: 'logs/' + pkg.name + '-debug.log', period: '1d', count: 3 },
    { level: 'debug', type: 'periodic-file', path: 'logs/' + pkg.name, period: 'hourly' }
  ]
});

process.on('SIGUSR2', function () {
    log.reopenFileStreams();
});

log.info('starting "' + pkg.name + '" app version ' + pkg.version);

module.exports = log;


