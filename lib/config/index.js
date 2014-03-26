var lodash  = require('lodash');
var express = require('express');

module.exports = function(app) {

  app.configure(function() {
    app.use(express.json());
    app.use(express.urlencoded());

    lodash.merge(app.settings, require('../../etc/general'));
  });

  app.configure('production', function() {
    app.use(express.logger());
    app.use(express.compress());

    lodash.merge(app.settings, require('../../etc/production'));
  });

  app.configure('development', function() {
    lodash.merge(app.settings, require('../../etc/development'));
  });

};
