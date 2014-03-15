module.exports = function(app) {

  app.post('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.query(app.customers.insert(req.body), function(err, result) {
      if (err) return next(err);

      var query = {
        id: result.insertId,
        limit: 1
      };

      app.query(app.customers.select(query), function(err, result) {
        if (err) return next(err);

        res.json(200, result.pop());
      });
    });
  });

  app.get('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.query(app.customers.select(req.query), function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.all('/customers/:id', function(req, res, next) {
    if (!req.accepts('json')) return next();

    req.params.limit = 1;

    app.query(app.customers.select(req.params), function(err, result) {
      if (err) return next(err);

      req.customer = result.pop();

      next();
    });
  });

  app.get('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    res.json(200, req.customer);
  });

  app.put('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    res.send(200);
  });

  app.del('/customers/:id', function(req, res, next) {
    if (!req.customer) return next();

    app.query(app.customers.delete(req.customer), function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

};
