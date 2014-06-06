var mongoose = require('mongoose');

var Product = mongoose.models.Product;

exports.create = function(done) {
  this.product = new Product({
    title: 'Casual Socks',
    pricing: {
      retail: 2.99
    },
    derivates: [
      { color: 'red', size: 42 },
      { color: 'blue', size: 42 }
    ]
  });

  this.product.save(done);
  this.product = this.product.toJSON();
};

exports.remove = function(done) {
  Product.remove({}, done);
};
