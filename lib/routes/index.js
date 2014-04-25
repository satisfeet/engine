var route = require('koa-route');

module.exports = function(app) {

  app.use(function *(next) {
    if (!this.accepts('json')) this.throw(406);

    yield next;
  });

  var customers = require('./customers');

  app.use(route.get('/customers', customers.list));
  app.use(route.post('/customers', customers.insert));
  app.use(route.get('/customers/:param', customers.show));
  app.use(route.put('/customers/:param', customers.update));
  app.use(route.del('/customers/:param', customers.remove));

};
