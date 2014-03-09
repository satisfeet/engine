module.exports = function(app) {

  app.get('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.customers.find(req.body, function(err, result) {
      if (err) return next(err);

      res.send(result);
    });
  });

  app.post('/customers', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.customers.create(req.body, function(err, result) {
      if (err) return next(err);

      res.send(result);
    });
  });

};
