'use strict';

var http = require('http');

var test = function() {
  http.get({
        host: 'localhost',
        path: '/products',
        port: 3000
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
          console.log (body);
          setTimeout(test,27000);
        });
    });
  };


test();
