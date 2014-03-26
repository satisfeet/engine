var mongoose = require('mongoose');

module.exports = function(app) {

  var Material = mongoose.models.Material;

  app.post('/materials', function(req, res, next) {
    console.log(new Material(req.body));

    Material.create(req.body, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.get('/materials', function(req, res, next) {
    Material.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.all('/materials/:id', function(req, res, next) {
    Material.findOneBy(req.params, function(err, result) {
      if (err) return next(err);

      req.material = result;

      next();
    });
  });

  app.get('/materials/:id', function(req, res, next) {
    if (!req.material) return next();

    res.json(200, req.material);
  });

  app.put('/materials/:id', function(req, res, next) {
    if (!req.material) return next();

    req.material.set(req.body);
    req.material.save(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

  app.del('/materials/:id', function(req, res, next) {
    if (!req.material) return next();

    req.material.remove(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

};
