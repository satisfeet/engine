var mongoose = require('mongoose');

module.exports = function(app) {

  var Product = mongoose.models.Product;

  app.post('/products', function *(next) {
    var result = yield Product.create(this.request.body);

    this.body = result;
    this.type = 'json';
  });

  app.get('/products', function *(next) {
    var result = yield Product.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.get('/products/:id', function *(next) {
    var result = yield Product.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.put('/products/:id', function *(next) {
    var result = yield Product.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body);

    this.status = 204;
  });

  app.del('/products/:id', function *(next) {
    var result = yield Product.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy();

    this.status = 204;
  });

};
