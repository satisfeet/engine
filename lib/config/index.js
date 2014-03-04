var confus  = require('confus');
var lodash  = require('lodash');
var express = require('express');

module.exports = function(app) {

  var config = confus({
    profiles: {
      production: [
        'etc/general',
        'etc/production'
      ],
      development: [
        'etc/general',
        'etc/development'
      ]
    },
    root: __dirname + '/../../'
  });

  confus.at('*', function() {
    app.use(express.json());
    app.use(express.urlencoded());
  });

  confus.at('production', function() {
    app.use(express.logger());
    app.use(express.compress());
  });

  lodash.merge(app.settings, config);

};
