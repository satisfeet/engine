module.exports = function(app) {

  app.get('/accounts', function(req, res, next) {
    app.db.query('SHOW DATABASES', function(err, result) {
      if (err) return next(err);

      res.send(result);
    });
  });

  app.post('/accounts', function(req, res, next) {

  });

  app.get('/accounts/:id', function(req, res, next) {

  });

  app.put('/accounts/:id', function(req, res, next) {

  });

  app.del('/accounts/:id', function(req, res, next) {

  });

};
