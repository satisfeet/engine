var express = require('express');

module.exports = function(app) {

  app.use(function(req, res, next) {
    if (req.accepts('json')) {
      return res.json(404, { error: 'Not found' });
    }

    next();
  });

  app.use(express.errorHandler());

};
