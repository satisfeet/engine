var superagent = require('superagent');

var Customer  = require('./model');
var Customers = require('./collection');

module.exports = function(app) {

  app('/customers', function(context, next) {
    var customers = context.customers = new Customers();

    superagent.get('/customers').accept('json').end(function(err, res) {
      if (err) return next(err);

      res.body.forEach(function(item) {
        customers.push(new Customer(item));
      });
    });

    next();
  });

};
