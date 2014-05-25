var mongoose = require('mongoose');

module.exports = function(app) {

  var Article = mongoose.models.Article;
  var Variety = mongoose.models.Variety;

  app.register('/articles', ['POST'], function *(next) {
    var article = yield Article.create(this.request.body);

    this.status = 204;
  });

  app.register('/articles', ['GET'], function *(next) {
    var articles = yield Article.findBy(this.request.query);
    var varieties = yield Variety.reduceBy(this.request.query);

    articles.forEach(function(article) {
      varieties.forEach(function(variety) {
        article.merge(variety);
      });
    });

    this.body = articles;
    this.type = 'json';
  });

  app.register('/articles/:id', ['GET'], function *(next) {
    var article = yield Article.findOneBy(this.params);

    if (!article) {
      return yield next;
    }

    var variety = yield Variety.reduceOneBy({ article: article.id });

    article.merge(variety);

    this.body = article;
    this.type = 'json';
  });

  app.register('/articles/:id', ['PUT'], function *(next) {
    var article = yield Article.findOneBy(this.params);

    if (!article) {
      return yield next;
    }
    yield article.persist(this.request.body);

    this.status = 204;
  });

  app.register('/articles/:id', ['DELETE'], function *(next) {
    var article = yield Article.findOneBy(this.params);

    if (!article) {
      return yield next;
    }
    yield article.destroy();

    this.status = 204;
  });

};
