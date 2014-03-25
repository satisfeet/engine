var express = require('express');

module.exports = function(app) {

  var options = app.settings.account;

  app.use(express.basicAuth(options.username, options.password));

};
