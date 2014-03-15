module.exports = function(app) {

  app.post('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.customers.create(req.body, function(err, result) {
      if (err) return next(err);

      res.send(result);
    });
  });

  app.get('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.customers.find(req.query, function(err, result) {
      if (err) return next(err);

      res.send(result);
    });
  });

  app.all('/customers/:id', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.customers.findOne(req.params, function(err, result) {
      if (err) return next(err);

      req.customer = result;

      next();
    });
  });

  app.get('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    res.send(req.customer);
  });

  app.put('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    app.customers.update(req.customer, function(err) {
      if (err) return next(err);

      res.send(200);
    });
  });

  app.del('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    app.customers.destroy(req.customer, function(err) {
      if (err) return next(err);

      res.send(200);
    });
  });

};
