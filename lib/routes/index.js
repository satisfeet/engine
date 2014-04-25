var route = require('koa-route');

var customers = require('./customers');
var products  = require('./products');
var orders    = require('./orders');

module.exports = function(app) {

  app.use(function *(next) {
    if (!this.accepts('json')) this.throw(406);

    yield next;
  });

  app.use(route.get('/customers', customers.search));
  app.use(route.post('/customers', customers.create));
  app.use(route.get('/customers/:customer', customers.display));
  app.use(route.put('/customers/:customer', customers.update));
  app.use(route.del('/customers/:customer', customers.remove));

  app.use(route.get('/products', products.search));

  app.use(route.get('/orders', orders.search));

};
