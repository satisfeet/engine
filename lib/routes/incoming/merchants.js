var mongoose = require('mongoose');

module.exports = function(app) {

  var Merchant = mongoose.models.Merchant;

  app.get('/merchants', function(req, res, next) {
    Merchant.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.post('/merchants', function(req, res, next) {
    Merchant.create(req.body, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.get('/merchants/:merchant', function(req, res, next) {
    if (!req.merchant) return next();

    res.status(200);
    res.format({
      json: function() {
        res.json(req.merchant);
      }
    });
  });

  app.put('/merchants/:merchant', function(req, res, next) {
    if (!req.merchant) return next();

    req.merchant.set(req.body);
    req.merchant.save(function(err) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.del('/merchants/:merchant', function(req, res, next) {
    if (!req.merchant) return next();

    req.merchant.remove(function(err) {
      if (err) return next();

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.param('merchant', function(req, res, next, id) {
    Merchant.findOneBy({ id: id }, function(err, result) {
      if (err) return next(err);

      req.merchant = result;

      next();
    });
  });

};
