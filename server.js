'use strict';

var Hapi = require('hapi');

var pkg = require('./package.json');

var log = require('./lib/logging');

var server = new Hapi.Server();

var routes = require('./routes');

var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: pkg.name,
  streams: [
    { level: 'info', stream: process.stdout },          // log INFO and above to stdout
    { level: 'error', path: 'logs/' + pkg.name + '.log'},         // log ERROR and above to a file
    { level: 'debug', path: 'logs/' + pkg.name + '-debug.log'},   // log DEBUG and above to a debug file
  ]
});

log.info('starting "' + pkg.name + '" app version ' + pkg.version);

server.connection({
    host: 'localhost',
    port: Number(process.env.PORT || 3000)
});

server.ext('onPostHandler', function (request, reply) {
//  log.info(toCommonLogFormat(request));
  reply(request.response);
});

server.route(routes);

server.start();
