var mongoose = require('mongoose');

module.exports = function(app) {

  var Article = mongoose.models.Article;

  app.get('/articles', function(req, res, next) {
    Article.findBy(req.query, function(err, result) {
      if (err) return next(err);

      res.status(200);
      res.format({
        json: function() {
          res.json(reesult);
        }
      });
    });
  });

};
