var joi  = require('joi');
var monk = require('co-monk');

var schema    = require('./schema');
var sanitizer = require('./sanitizer');

module.exports = function(app, db) {

  app.customers = monk(db.get('customers'));

  app.all('/customers*', function *(next) {
    if (~['POST', 'PUT'].indexOf(this.method)) {
      try {
        yield validate(this.body);
      } catch(error) {
        this.throw(400);
      }

      sanitize(this.body);
    }

    yield next;
  });

  app.customers.index('email', {
    unique: true
  });

};

function validate(model) {
  return function(callback) {
    joi.validate(model, schema, callback);
  }
}

function sanitize(model) {
  this.body.name = sanitizer.name(this.body.name);
  this.body.email = sanitizer.email(this.body.email);
  this.body.company = sanitizer.company(this.body.company);
  this.body.address = sanitizer.address(this.body.address);
}
