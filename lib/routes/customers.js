module.exports = function(app) {

  app.get('/customers', function(req, res, next) {
    app.customers.find(function(err, result) {
      if (err) return next(err);

      res.render('customers/list', {
        customers: result
      });
    });
  });

};
