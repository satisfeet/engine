var mongoose = require('mongoose');

module.exports = function(app) {

  var Order = mongoose.models.Order;

  app.post('/orders', function *(next) {
    var result = yield Order.create(this.request.body);

    this.body = result;
    this.type = 'json';
  });

  app.get('/orders', function *(next) {
    var result = yield Order.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.get('/orders/:id', function *(next) {
    var result = yield Order.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.put('/orders/:id', function *(next) {
    var result = yield Order.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body);

    this.status = 204;
  });

  app.del('/orders/:id', function *(next) {
    var result = yield Order.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy();

    this.status = 204;
  });

};
