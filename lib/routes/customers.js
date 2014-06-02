module.exports = function(app) {

  app.post('/customers', function *(next) {
    var result = yield this.Customer.insert(this.request.body);

    this.status = 201;
  });

  app.get('/customers', function *(next) {
    var result = yield this.Customer.find(this.request.query);

    this.type = 'json';
    this.body = result.map(toJSON);
  });

  app.get('/customers/:id', function *(next) {
    var result = yield this.Customer.findOne(this.params);

    if (!result) {
      return yield next;
    }

    this.type = 'json';
    this.body = result;
  });

  app.put('/customers/:id', function *(next) {
    var result = yield this.Customer.findOne(this.params);

    if (!result) {
      return yield next;
    }
    yield this.Customer.update(result.set(this.request.body));

    this.status = 204;
  });

  app.del('/customers/:id', function *(next) {
    var result = yield this.Customer.findOne(this.params);

    if (!result) {
      return yield next;
    }
    yield this.Customer.remove(result);

    this.status = 204;
  });

};

function toJSON(model) {
  return model.toJSON();
}
