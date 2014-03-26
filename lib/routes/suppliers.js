var mongoose = require('mongoose');

module.exports = function(app) {

  var Supplier = mongoose.models.Supplier;

  app.get('/suppliers', function(req, res, next) {
    Supplier.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.post('/suppliers', function(req, res, next) {
    Supplier.create(req.body, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.get('/suppliers/:supplier', function(req, res, next) {
    if (!req.supplier) return next();

    res.status(200);
    res.format({
      json: function() {
        res.json(req.supplier);
      }
    });
  });

  app.put('/suppliers/:supplier', function(req, res, next) {
    if (!req.supplier) return next();

    req.supplier.set(req.body);
    req.supplier.save(function(err) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.del('/suppliers/:supplier', function(req, res, next) {
    if (!req.supplier) return next();

    req.supplier.remove(function(err) {
      if (err) return next();

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.param('supplier', function(req, res, next, id) {
    Supplier.findOneBy({ id: id }, function(err, result) {
      if (err) return next(err);

      req.supplier = result;

      next();
    });
  });

};
