var util    = require('util');
var exempel = require('exempel');

var Customer = require('./model');

function Customers(source) {
  this.Model = Customer;

  exempel.Collection.call(this, source);
}

util.inherits(Customers, exempel.Collection);

module.exports = Customers;
