var lodash = require('lodash');

var statics = require('./statics');
var methods = require('./methods');

module.exports = function(context, collection) {

  function Customer(object) {
    this.attrs = {};

    lodash.merge(this, object);
  }

  Customer.collection = collection;

  lodash.merge(Customer, statics);
  lodash.merge(Customer.prototype, methods);

  context.Customer = Customer;

};
