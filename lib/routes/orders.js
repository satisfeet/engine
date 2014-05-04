var router   = require('koa-router');
var mongoose = require('mongoose');

module.exports = function(app) {

  var Order = mongoose.models.Order;

  app.register('/orders', ['POST'], function *(next) {
    var result = yield Order.create(this.request.body);

    this.status = 201;
  });

  app.register('/orders', ['GET'], function *(next) {
    var result = yield Order.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.register('/orders/:id', ['GET'], function *(next) {
    var result = yield Order.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.register('/orders/:id', ['PUT'], function *(next) {
    var result = yield Order.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body)();

    this.status = 204;
  });

  app.register('/orders/:id', ['DELETE'], function *(next) {
    var result = yield Order.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy()();

    this.status = 204;
  });

};
