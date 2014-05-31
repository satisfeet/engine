module.exports = function(app) {

  app.register('/customers', ['POST'], function *(next) {
    var result = yield this.Customer.insert(this.request.body);

    this.status = 201;
  });

  app.register('/customers', ['GET'], function *(next) {
    var result = yield this.Customer.findAll(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.register('/customers/:id', ['GET'], function *(next) {
    var result = yield this.Customer.findOne(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.register('/customers/:id', ['PUT'], function *(next) {
    var result = yield this.Customer.findOne(this.params);

    if (!result) {
      return yield next;
    } else {
      result.set(this.request.body);
    }
    yield this.Customer.update(result);

    this.status = 204;
  });

  app.register('/customers/:id', ['DELETE'], function *(next) {
    var result = yield this.Customer.findOne(this.params);

    if (!result) {
      return yield next;
    }
    yield this.Customer.remove(result);

    this.status = 204;
  });

};
