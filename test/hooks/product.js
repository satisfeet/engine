var mongoose = require('mongoose');

var Product = mongoose.models.Product;

exports.create = function(done) {
  this.product = new Product({
    title: 'Casual Socks',
    pricing: {
      retail: 2.99
    }
  });

  this.product.save(done);
  this.product = this.product.toJSON();
};

exports.remove = function(done) {
  Product.remove({}, done);
};
