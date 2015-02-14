'use strict';

var async = require('async');

var https = require('https');

var log = require('./logging');

var hostname = 'www.qaa.priceline.com';

var _ = require('lodash');

var search = function(cb) {
async.parallel({
    fly: function(callback){
      https.get({
              host: hostname,
              path: '/pws/v0/air/search/BDL-MCO-20150313/MCO-BDL-20150319/2',
          }, function(response) {
              var body = '';
              response.on('data', function(d) {
                  body += d;
              });
              response.on('end', function() {
                callback(null, JSON.parse(body));
              });
          });
      },
    stay: function(callback){
      https.get({
              host: hostname,
              path: '/pws/v0/stay/retail/listing/orlando?check-in=20150313&check-out=20150319&rooms=1',
          }, function(response) {
              var body = '';
              response.on('data', function(d) {
                  body += d;
              });
              response.on('end', function() {
                callback(null, JSON.parse(body));
              });
          });
    },

}, function(err, results) {
  var responeData = {};
  if (err) {
    log.error ( err );
    responeData.error = err;
  } else {
    var airResponse = results.fly.airSearchRsp;

    var itinList = airResponse.pricedItinerary;
    var sliceMap = airResponse.sliceMap;
    var segmentMap = airResponse.segmentMap;

    var hotelList = results.stay.hotels;

    var itin = itinList[0];
    responeData.pricedItinerary = itin;
    responeData.airport = airResponse.airport;
    responeData.airline = airResponse.airline;

    var pricingInfo = itin.pricingInfo;

    delete itin.pricingInfo;

    _.each(itin.slice, function (slice) {
      var sliceData = sliceMap[slice.uniqueSliceId];
      for(var key in sliceData) {
        slice[key] = sliceData[key];
      }

      _.each (sliceData.segment, function(segment) {
        var segmentData = segmentMap[segment.uniqueSegId];
        for(var key in segmentData) {
          segment[key] = segmentData[key];
        }
      });

    });
//    _.each(itinList.slice(-1), function (itin) {

      var airPrice = pricingInfo.totalFare * 2;

      _.each(hotelList, function(hotel) {

        var hotelPrice = hotel.ratesSummary.minPrice * 6;

        var packagePrice = hotelPrice + airPrice;

        hotel.packagePrice = packagePrice;

        delete hotel.ratesSummary;

      });

      responeData.hotels = hotelList;
//    });
  }

  cb (responeData);

});

};

module.exports.search = search;