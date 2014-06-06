var mongoose = require('mongoose');

var Process = mongoose.models.Process;

exports.create = function(done) {
  this.process = new Process({
    customer: this.customer.id,
    items: [
      {
        product: this.product.id,
        quantity: 2,
        price: 1.99
      }
    ]
  });
  this.process.save(done);
  this.process = this.process.toJSON();
};

exports.remove = function(done) {
  Process.remove({}, done);
};
