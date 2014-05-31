var mongoose = require('mongoose');

var Customer = mongoose.models.Customer;

exports.create = function(done) {
  this.customer = new Customer({
    name: 'Bodo Kaiser',
    email: 'i@bodokaiser.io',
    address: {
      street: 'Geiserichstr. 3',
      city: 'Berlin',
      zip: 12105
    }
  });
  this.customer.save(done);
  this.customer = this.customer.toJSON();
};

exports.remove = function(done) {
  Customer.remove({}, done);
};
