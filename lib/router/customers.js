var mongoose = require('mongoose');
var thunkify = require('thunkify');

module.exports = function(app) {

  var Customer = mongoose.models.Customer;

  app.post('/customers', function *(next) {
    try {
      var model = yield Customer.create(this.request.body);
    } catch(error) {
      this.status = 400;
      this.body = { error: 'Validation failed' };
    }

    if (model) this.status = 201;
  });

  app.get('/customers', function *(next) {
    var query = this.request.query;

    this.body = yield Customer.findBy(query);
  });

  app.get('/customers/:id', resolve, function *(next) {
    if (!this.customer) return yield next;

    this.body = this.customer;
  });

  app.del('/customers/:id', resolve, function *(next) {
    if (!this.customer) return yield next;

    this.status = 200;

    yield this.customer.destroy()();
  });

  function* resolve(next) {
    try {
      this.customer = yield Customer.findOneBy(this.params);
    } catch(error) {}

    yield next;
  }

};
