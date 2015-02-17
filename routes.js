'use strict';

var log = require('./lib/logging');

var Joi = require('joi');

var pkgSearch = require('./lib/pkg-search');

var products = [{
        id: 1,
        name: 'Guitar'
    },
    {
        id: 2,
        name: 'Banjo'
    }
];

function findProducts(name) {
    return products.filter(function(product) {
        return product.name.toLowerCase() === name.toLowerCase();
    });
}

function searchByName (city, reply) {
  log.info('search called for ' + city);

  pkgSearch.search (city, function (responseData) {
    reply(responseData);
  });
}

function search(request, reply) {

    log.info('search called');

    if (request.query.city) {
        searchByName(request.query.city, function (responseData) {
          reply(responseData);
        });
    } else {
        searchByName('orlando', function (responseData) {
          reply(responseData);
        });
    }
}



function getProducts(request, reply) {

    log.info('getProducts called');

    if (request.query.name) {
        reply(findProducts(request.query.name));
    }
    else {
        reply(products);
    }
}

function getProduct(request, reply) {
    var product = products.filter(function(p) {
        return p.id === request.params.id;
    }).pop();

    reply(product);
}

function addProduct(request, reply) {
  console.log ('adding a ' + request.params.name);
    var product = {
        id: products[products.length - 1].id + 1,
        name: request.params.name
    };

    products.push(product);

    reply(product);

}

module.exports = [
    { method: 'GET', path: '/search', config: { handler: search } },
    { method: 'GET', path: '/products', config: { handler: getProducts } },
    { method: 'GET', path: '/products/{id}', config: { handler: getProduct } },
    {
      method: 'POST',
      path: '/products/{name}',
      handler: addProduct,
      config: {
        validate: {
          params: {
            name: Joi.string().min(3)
          }
        }
      }
    },
    { method: 'GET', path: '/', handler: function (request, reply) {
        console.log (request);
        reply.file('app/index.html');
    }},
    { method: 'GET', path: '/index.html', handler: function (request, reply) {
        console.log (request);
        reply.file('app/index.html');
    }},
    { method: 'GET', path: '/images/{x}', handler: function (request, reply) {
        console.log (request.path);
        reply.file('app/' + request.path);
    }},
    { method: 'GET', path: '/styles/{x}', handler: function (request, reply) {
        console.log (request.path);
        reply.file('app/' + request.path);
    }},
    { method: 'GET', path: '/scripts/{x}', handler: function (request, reply) {
        console.log (request.path);
        reply.file('app/' + request.path);
    }},
    { method: 'GET', path: '/views/{x}', handler: function (request, reply) {
        console.log (request.path);
        reply.file('app/' + request.path);
    }},


];

