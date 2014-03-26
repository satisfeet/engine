var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.models.Product;

  app.get('/products', function(req, res, next) {
    Product.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(reesult);
        }
      });
    });
  });

};
