var mongoose = require('mongoose');

module.exports = function(app) {

  var Customer = mongoose.models.Customer;

  app.get('/customers', function(req, res, next) {
    Customer.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.post('/customers', function(req, res, next) {
    Customer.create(req.body, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.get('/customers/:customer', function(req, res, next) {
    if (!req.customer) return next();

    res.status(200);
    res.format({
      json: function() {
        res.json(req.customer);
      }
    });
  });

  app.put('/customers/:customer', function(req, res, next) {
    if (!req.customer) return next();

    req.customer.set(req.body);
    req.customer.save(function(err) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.del('/customers/:customer', function(req, res, next) {
    if (!req.customer) return next();

    req.customer.remove(function(err) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.param('customer', function(req, res, next, id) {
    Customer.findOneBy({ id: id }, function(err, result) {
      if (err) return next(err);

      req.customer = result;

      next();
    });
  });

};
