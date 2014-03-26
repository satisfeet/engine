var mongoose = require('mongoose');

module.exports = function(app) {

  var Supplier = mongoose.models.Supplier;

  app.get('/suppliers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Supplier.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.post('/suppliers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Supplier.create(req.body, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.get('/suppliers/:supplier', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.supplier) return next();

    res.json(200, req.supplier);
  });

  app.put('/suppliers/:supplier', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.supplier) return next();

    req.supplier.set(req.body);
    req.supplier.save(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

  app.del('/suppliers/:supplier', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.supplier) return next();

    req.supplier.remove(function(err) {
      if (err) return next();

      res.json(200);
    });
  });

  app.param('supplier', function(req, res, next, id) {
    if (!req.accepts('json')) return next();

    Supplier.findOneBy({ id: id }, function(err, result) {
      if (err) return next(err);

      req.supplier = result;

      next();
    });
  });

};
