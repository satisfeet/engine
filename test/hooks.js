var mongoose  = require('mongoose');

var app = require('../lib');

var Product  = mongoose.models.Product;
var Customer = mongoose.models.Customer;

exports.setup = function() {
  this.username = app.auth.username;
  this.password = app.auth.password;

  if (!this.app) this.app = app.listen();

  this.Product  = mongoose.models.Product;
  this.Customer = mongoose.models.Customer;
}

exports.product = {

  create: function(done) {
    this.product = new Product({
      title: 'Casual Socks',
      images: [
        { name: 'blue', url: 'http://satisfeet.me/images/casual/blue.jpeg' }
      ],
      pricing: {
        retail: 2.99
      },
      variations: {
        sizes: [42, 44],
        colors: ['red', 'blue']
      },
      description: 'This is a description to the casual socks. I hope its ok.'
    });

    this.product.save(done);
    this.product = this.product.toJSON();
  },

  remove: function(done) {
    Product.remove({}, done);
  }

};

exports.customer = {

  create: function(done) {
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
  },

  remove: function(done) {
    Customer.remove({}, done);
  }

};
