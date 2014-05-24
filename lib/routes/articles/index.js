var mongoose = require('mongoose');

module.exports = function(app) {

  var Article = mongoose.models.Article;

  app.register('/articles', ['POST'], function *(next) {
    var result = yield Article.create(this.request.body);

    this.status = 204;
  });

  app.register('/articles', ['GET'], function *(next) {
    var result = yield Article.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.register('/articles/:id', ['GET'], function *(next) {
    var result = yield Article.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.register('/articles/:id', ['PUT'], function *(next) {
    var result = yield Article.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body);

    this.status = 204;
  });

  app.register('/articles/:id', ['DELETE'], function *(next) {
    var result = yield Article.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy();

    this.status = 204;
  });

};
