var mongoose = require('mongoose');

module.exports = function(app) {

  var Order = mongoose.models.Order;

  app.get('/orders', function(req, res, next) {
    Order.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

};
