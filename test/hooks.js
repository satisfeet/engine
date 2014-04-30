var mongoose  = require('mongoose');

var app = require('../lib');

var Order = mongoose.models.Order;
var Product = mongoose.models.Product;
var Customer = mongoose.models.Customer;

exports.setup = function() {
  if (!this.app) {
    this.app = app.listen();
  }
}

exports.orders = {
  remove: function(done) {
    Order.remove({}, done);
  }
};

exports.products = {
  create: function(done) {
    this.product = new mongoose.models.Product({
      name: 'Casual Socks',
      price: 2.99
    });
    this.product.save(done);
    this.product = this.product.toJSON();
  },
  remove: function(done) {
    Product.remove({}, done);
  }
};

exports.customers = {
  create: function(done) {
    this.customer = new mongoose.models.Customer({
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
  },
  remove: function(done) {
    Customer.remove({}, done);
  }
};
