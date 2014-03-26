var mongoose = require('mongoose');

module.exports = function(app) {

  var Supply = mongoose.models.Supply;

  app.get('/supplies', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Supply.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

};
