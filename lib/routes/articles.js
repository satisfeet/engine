var mongoose = require('mongoose');

module.exports = function(app) {

  var Article = mongoose.models.Article;

  app.get('/articles', function(req, res, next) {
    if (!req.accepts('json')) return next();

    Article.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

};
