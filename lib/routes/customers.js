var router   = require('koa-router');
var mongoose = require('mongoose');

module.exports = function(app) {

  var Customer = mongoose.models.Customer;

  app.post('/customers', function *(next) {
    var result = yield Customer.create(this.request.body);

    this.body = result;
    this.type = 'json';
  });

  app.get('/customers', function *(next) {
    var result = yield Customer.findBy(this.request.query);

    this.body = result;
    this.type = 'json';
  });

  app.get('/customers/:id', function *(next) {
    var result = yield Customer.findOneBy(this.params);

    if (!result) {
      return yield next;
    }

    this.body = result;
    this.type = 'json';
  });

  app.put('/customers/:id', function *(next) {
    var result = yield Customer.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.persist(this.request.body);

    this.status = 204;
  });

  app.del('/customers/:id', function *(next) {
    var result = yield Customer.findOneBy(this.params);

    if (!result) {
      return yield next;
    }
    yield result.destroy();

    this.status = 204;
  });

};
