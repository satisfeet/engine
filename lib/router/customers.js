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

};