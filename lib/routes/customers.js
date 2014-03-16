module.exports = function(app) {

  app.get('/customers', function(req, res, next) {
    app.customers.find(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

};
