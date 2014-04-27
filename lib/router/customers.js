var lodash = require('lodash');

module.exports = function(app) {

  app.post('/customers', function *(next) {
    var model = this.request.body;

    this.body = yield app.customers.insert(model);
  });

  app.get('/customers', function *(next) {
    var query = {};

    filter(query, this.query.filter);
    search(query, this.query.search);

    this.body = yield app.customers.find(query);
  });

  app.get('/customers/:param', function *(next) {
    this.customer = yield app.customers.findById(this.params.param);
  });

  app.del('/customers/:param', function *(next) {
    this.customer = yield app.customers.findById(this.params.param);

    if (this.customer) {
      this.status = 200;
    } else {
      this.status = 404;
      this.body = {
        error: 'Invalid parameter.'
      };
    }

    if (this.status === 200) {
      yield app.customers.remove(this.customer);
    }
  });

};

function filter(query, param) {
  if (!param) return;

  lodash.forIn(param, function(value, key) {
    if (lodash.isPlainObject(value)) {
      query[key] = {};

      filter(query[key], value);
    }
    if (lodash.isString(value)) {
      query[key] = {
        $regex: new RegExp(value)
      };
    }
  });
}

function search(query, param) {
  if (!param) return;

  var regex = {
    $regex: new RegExp(param)
  };

  query.$or = [
    { name: regex },
    { email: regex },
    { company: regex },
    { 'address.street': regex },
    { 'address.city': regex }
  ];
}
