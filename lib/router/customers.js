module.exports = function(app) {

  app.get('/customers', function *(next) {
    this.body = yield app.customers.find(this.query);
  });

  app.post('/customers', function *(next) {
    this.body = yield app.customers.insert(this.request.body);
  });

  app.get('/customers/:param', function *(next) {
    this.customer = yield app.customers.findById(this.params.param);
  });

  app.del('/customers/:param', function *(next) {
    this.customer = yield app.customers.findById(this.params.param);

    if (this.customer) {
      this.status = 200;
    } else {
      this.status = 404;
      this.body = {
        error: 'Invalid parameter.'
      };
    }

    if (this.status === 200) {
      yield app.customers.remove(this.customer);
    }
  });

};
