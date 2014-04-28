var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.models.Product;

  app.register('/products', ['POST'], function *(next) {
    var result = yield Product.create(this.request.body);

    this.status = 201;
  });

  app.register('/products', ['GET'], function *(next) {
    var result = yield Product.findBy(this.request.query);

    this.status = 200;
    this.body = result;
  });

  app.register('/products/:id', ['GET'], function *(next) {
    yield next;
  });

  app.register('/products/:id', ['PUT'], function *(next) {
    yield next;
  });

  app.register('/products/:id', ['DELETE'], function *(next) {
    yield next;
  });

};
