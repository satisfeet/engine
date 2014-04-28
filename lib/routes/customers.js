var mongoose = require('mongoose');

module.exports = function(app) {

  var Customer = mongoose.models.Customer;

  app.post('/customers', function *(next) {
    var model = yield Customer.create(this.request.body);

    this.status = 201;
  });

  app.get('/customers', function *(next) {
    var model = yield Customer.findBy(this.request.query);

    this.status = 200;
    this.body = model;
  });

  app.get('/customers/:id', resolve, function *(next) {
    if (!this.customer) return yield next;

    this.status = 200;
    this.body = this.customer;
  });

  app.put('/customers/:id', resolve, function *(next) {
    if (!this.customer) return yield next;

    yield this.customer.persist(this.request.body)();

    this.status = 200;
  });

  app.del('/customers/:id', resolve, function *(next) {
    if (!this.customer) return yield next;

    yield this.customer.destroy()();

    this.status = 200;
  });

  function* resolve(next) {
    this.customer = yield Customer.findOneBy(this.params);

    yield next;
  }

};
