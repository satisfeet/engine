var monk  = require('co-monk');
var route = require('koa-route');

var validate = require('./validate');
var sanitize = require('./sanitize');

module.exports = function(app, db) {

  app.customers = monk(db.get('customers'));

  app.use(route.post('/customers', validate));
  app.use(route.post('/customers', sanitize));

  app.use(route.put('/customers/:param', validate));
  app.use(route.put('/customers/:param', sanitize));

  app.customers.index('email', {
    unique: true
  });

};
