var mongoose = require('mongoose');

module.exports = function(app) {

  var Customer = mongoose.models.Customer;

  app.register('/customers', ['POST'], function *(next) {
    var result = yield Customer.create(this.request.body);

    this.status = 201;
  });

  app.register('/customers', ['GET'], function *(next) {
    var result = yield Customer.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.register('/customers/:id', ['GET'], function *(next) {
    var result = yield Customer.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.register('/customers/:id', ['PUT'], function *(next) {
    var result = yield Customer.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body)();

    this.status = 200;
  });

  app.register('/customers/:id', ['DELETE'], function *(next) {
    var result = yield Customer.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy()();

    this.status = 200;
  });

};
