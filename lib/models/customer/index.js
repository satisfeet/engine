var joi      = require('joi');
var monk     = require('co-monk');
var route    = require('koa-route');
var thunkify = require('thunkify');

var schema = require('./schema');

module.exports = function(app, db) {

  app.customers = monk(db.get('customers'));

  app.use(route.put('/customers/:param', validate));
  app.use(route.post('/customers', validate));

  app.customers.index('email', {
    unique: true
  });

};

function* validate(next) {
  var model = this.request.body;

  try {
    yield thunkify(joi.validate)(model, schema);
  } catch(error) {
    this.throw(400, error);
  }

  yield next;
};
