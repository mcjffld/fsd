'use strict';

var Hapi = require('hapi');

var log = require('./lib/logging');

var pkg = require('./package.json');

var server = new Hapi.Server();

var toCommonLogFormat = require('hapi-common-log');

var routes = require('./routes');

var PORT = process.env.PORT || 3000;

server.connection({
    port: PORT
 });

server.on('error', function (e) {
  if (e.code === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(function () {
      server.close();
      server.connection({
        port: ++PORT
      });
    }, 1000);
  }
});

server.on('listen', function (x) {
  console.log (x);
  log.info ('Server started for %s on port %s at %s', pkg.name, server.address().port, new Date());


});


server.ext('onPostHandler', function (request, reply) {
  log.info(toCommonLogFormat(request));
  reply(request.response);
});

server.route(routes);

server.start();

//require('./g');