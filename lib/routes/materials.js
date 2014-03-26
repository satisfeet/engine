var mongoose = require('mongoose');

module.exports = function(app) {

  var Material = mongoose.models.Material;

  app.get('/materials', function(req, res, next) {
    Material.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.post('/materials', function(req, res, next) {
    Material.create(req.body, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(result);
        }
      });
    });
  });

  app.get('/materials/:material', function(req, res, next) {
    if (!req.material) return next();

    res.status(200);
    res.format({
      json: function() {
        res.json(result);
      }
    });
  });

  app.put('/materials/:material', function(req, res, next) {
    if (!req.material) return next();

    req.material.set(req.body);
    req.material.save(function(err) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.del('/materials/:material', function(req, res, next) {
    if (!req.material) return next();

    req.material.remove(function(err) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json();
        }
      });
    });
  });

  app.param('material', function(req, res, next, id) {
    Material.findOneBy({ id: id }, function(err, result) {
      if (err) return next(err);

      req.material = result;

      next();
    });
  });

};
