var util    = require('util');
var exempel = require('exempel');

function Customer(source) {
  exempel.Model.call(this, source);
}

util.inherits(Customer, exempel.Model);

module.exports = Customer;
