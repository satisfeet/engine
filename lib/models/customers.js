var is        = require('is-type');
var monk      = require('co-monk');
var validator = require('validator');

module.exports = function(app, db) {

  var customers = monk(db.get('customers'));

  app.use(function *(next) {
    if (~this.path.indexOf('/customers')) {
      this.customers = customers;

      if (~['PUT', 'POST'].indexOf(this.method)) {
        if (!is.object(this.request.body)) {
          this.throw(400, 'Invalid body.');
        }

        validate(this, this.request.body);
        sanitize(this, this.request.body);
      }
    }

    yield next;
  });

  customers.index('email', { unique: true });

};

function validate(context, body) {
  if (!body.name || !validator.isAlpha(body.name)) {
    context.throw(400, 'Invalid name.');
  }
  if (!body.email || !validator.isEmail(body.email)) {
    context.throw(400, 'Invalid email.');
  }
  if (body.company && validator.isAlpha(body.company)) {
    context.throw(400, 'Invalid company.');
  }
  if (is.object(body.address)) {
    if (!validator.isAlphaNumeric(body.address.street)) {
      context.throw(400, 'Invalid address street.');
    }
    if (!validator.isAlpha(body.address.city)) {
      context.throw(400, 'Invalid address city.');
    }
    if (!body.address.zip || body.address.zip > 99999) {
      context.throw(400, 'Invalid address zip.');
    }
  }
}

function sanitize(context, body) {
  body.name = body.name.trim();
  body.email = body.email.trim().toLowerCase();

  if (body.company) {
    body.company = body.company.trim();
  }
  if (body.address) {
    body.address.street = body.address.street.trim();
    body.address.city = body.address.street.city();
  }
}
