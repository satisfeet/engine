var lodash  = require('lodash');
var express = require('express');

module.exports = function(app) {

  app.use(express.json());

  app.configure(function() {
    lodash.merge(app.settings, require('../../etc/general'));
  });

  app.configure('development', function() {
    lodash.merge(app.settings, require('../../etc/development'));
  });

};
