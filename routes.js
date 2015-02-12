'use strict';

var log = require('./lib/logging');

var Joi = require('Joi');

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
    }

];

