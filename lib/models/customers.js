var monk  = require('co-monk');
var route = require('koa-route');

module.exports = function(app, db) {

  var customers = monk(db.get('customers'));

  app.use(function *(next) {
    this.customers = customers;

    yield next;
  });

  customers.index('email', { unique: true });

};
