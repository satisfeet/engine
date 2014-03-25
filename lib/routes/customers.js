var mongoose = require('mongoose');

module.exports = function(app) {

  var Customer = mongoose.models.Customer;

  app.post('/customers', function(req, res, next) {
    Customer.create(req.body, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.get('/customers', function(req, res, next) {
    Customer.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.all('/customers/:id', function(req, res, next) {
    Customer.findOneBy(req.params, function(err, result) {
      if (err) return next(err);

      req.customer = result;

      next();
    });
  });

  app.get('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    res.json(200, req.customer);
  });

  app.put('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    req.customer.set(req.body);
    req.customer.save(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

  app.del('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    req.customer.remove(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

};
