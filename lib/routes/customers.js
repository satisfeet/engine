module.exports = function(app) {

  app.get('/customers', function *(next) {
    this.body = yield app.customers.find(this.query);
  });

  app.post('/customers', function *(next) {
    this.body = yield app.customers.insert(this.body);
  });

  app.get('/customers/:param', function *(param, next) {
    this.customer = yield app.customers.findById(param);
  });

};
