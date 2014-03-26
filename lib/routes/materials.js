var mongoose = require('mongoose');

module.exports = function(app) {

  var Material = mongoose.models.Material;

  app.get('/materials', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Material.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.post('/materials', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Material.create(req.body, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

  app.get('/materials/:material', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.material) return next();

    res.json(200, req.material);
  });

  app.put('/materials/:material', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.material) return next();

    req.material.set(req.body);
    req.material.save(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

  app.del('/materials/:material', function(req, res, next) {
    if (!req.accepts('json')) return next();
    if (!req.material) return next();

    req.material.remove(function(err) {
      if (err) return next(err);

      res.json(200);
    });
  });

  app.param('material', function(req, res, next, id) {
    if (!req.accepts('json')) return next();

    Material.findOneBy({ id: id }, function(err, result) {
      if (err) return next(err);

      req.material = result;

      next();
    });
  });

};
