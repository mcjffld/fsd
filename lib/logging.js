'use strict';

var pkg = require('../package.json');

var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: pkg.name,
  streams: [
    { level: 'debug', stream: process.stdout },
  ]
});

log.info('starting "' + pkg.name + '" app version ' + pkg.version);

module.exports = log;


