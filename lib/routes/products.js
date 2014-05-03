var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.models.Product;

  app.register('/products', ['POST'], function *(next) {
    var result = yield Product.create(this.request.body);

    this.status = 201;
  });

  app.register('/products', ['GET'], function *(next) {
    var result = yield Product.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.register('/products/:id', ['GET'], function *(next) {
    var result = yield Product.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.register('/products/:id', ['PUT'], function *(next) {
    var result = yield Product.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body)();

    this.status = 204;
  });

  app.register('/products/:id', ['DELETE'], function *(next) {
    var result = yield Product.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy()();

    this.status = 204;
  });

};
