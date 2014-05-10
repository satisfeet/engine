var mongoose = require('mongoose');

module.exports = function(app) {

  var Order    = mongoose.models.Order;
  var Product  = mongoose.models.Product;
  var Customer = mongoose.models.Customer;

  app.get('/', function *(next) {
    this.body = {};
    this.body.orders = yield Order.count().exec();
    this.body.products = yield Product.count().exec();
    this.body.customers = yield Customer.count().exec();
  });

  app.options('*', function *(next) {
    this.status = 204;
  });

};
