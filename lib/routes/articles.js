module.exports = function(app) {

  var articles = app.articles;

  app.get('/articles', function(req, res, next) {
    if (!req.accepts('json')) return next();

    app.query(articles.select(req.query), function(err, result) {
      if (err) return next(err);

      res.json(200, result);
    });
  });

};
