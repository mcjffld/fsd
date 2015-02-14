'use strict';

var pkgSearch = require('./lib/pkg-search');

pkgSearch.search (function (responseData) {
  console.log (JSON.stringify(responseData));
});