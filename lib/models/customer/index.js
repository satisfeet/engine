var monk  = require('co-monk');

var validate = require('./validate');
var sanitize = require('./sanitize');

module.exports = function(app, db) {

  app.customers = monk(db.get('customers'));

  app.post('/customers', validate, sanitize);

  app.put('/customers/:param', validate, sanitize);

  app.customers.index('email', {
    unique: true
  });

};
