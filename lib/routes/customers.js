module.exports = function(app) {

  app.post('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    var query = app.customers.create(req.body);

    app.query(query, function(err, result) {
      if (err) return next(err);

      var query = app.customers.findOneBy({ id: result.insertId });

      app.query(query, function(err, result) {
        if (err) return next(err);

        res.send(result.pop());
      });
    });
  });

  app.get('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    var query = app.customers.findBy(req.query);

    app.query(query, function(err, result) {
      if (err) return next(err);

      res.send(result);
    })
  });

  app.del('/customers/:id', resolve, function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.customer) return next();

    var query = app.customers.destroy(req.params);

    app.query(query, function(err, result) {
      if (err) return next(err);

      res.send(200);
    });
  });

  function resolve(req, res, next) {
    if (!req.accepts('json')) return next();

    var query = app.customers.findOneBy(req.params);

    app.query(query, function(err, result) {
      if (err) return next(err);

      req.customer = result.pop();

      next();
    });
  }

};
