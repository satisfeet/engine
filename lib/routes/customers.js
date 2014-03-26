var mongoose = require('mongoose');

module.exports = function(app) {

  var Customer = mongoose.models.Customer;

  app.get('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Customer.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.post('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Customer.create(req.body, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.get('/customers/:customer', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.customer) return next();

    res.json(200, req.customer);
  });

  app.put('/customers/:customer', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.customer) return next();

    req.customer.set(req.body);
    req.customer.save(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

  app.del('/customers/:customer', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.customer) return next();

    req.customer.remove(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

  app.param('customer', function(req, res, next, id) {
    if (!req.accepts('json')) return next();

    Customer.findOneBy({ id: id }, function(err, result) {
      if (err) return next(err);

      req.customer = result;

      next();
    });
  });

};
