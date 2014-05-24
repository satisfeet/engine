var mongoose = require('mongoose');

var Order = mongoose.models.Order;

exports.create = function(done) {
  this.order = new Order({
    customer: this.customer.id,
    articles: [
      {
        article: this.article.id,
        quantity: 2,
        price: 1.99
      }
    ]
  });
  this.order.save(done);
  this.order = this.order.toJSON();
};

exports.remove = function(done) {
  Order.remove({}, done);
};
