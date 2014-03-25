var mongoose = require('mongoose');

module.exports = function(app) {

  var Material = mongoose.models.Material;

  app.get('/materials', function(req, res, next) {
    Material.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

};
