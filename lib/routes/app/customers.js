module.exports = function(app) {

  app.get('/customers', function(req, res, next) {
    if (!req.accepts('html')) return next();

    app.customers.find(req.query, function(err, result) {
      if (err) return next(err);

      res.render('customers/list', {
        customers: result
      });
    });
  });

  app.all('/customers/create', function(req, res, next) {
    if (!req.accepts('html')) return next();

    if (req.method === 'POST') {
      app.customers.create(req.body, function(err, result) {
        if (err) return next(err);

        res.redirect('customers');
      });
    } else {
      res.render('customers/create');
    }
  });

};
