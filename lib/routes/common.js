var mongoose = require('mongoose');

module.exports = function(app) {

  var Order    = mongoose.models.Order;
  var Article  = mongoose.models.Article;
  var Customer = mongoose.models.Customer;

  app.get('/', function *(next) {
    this.body = {};
    this.body.orders = yield Order.count().exec();
    this.body.articles = yield Article.count().exec();
    this.body.customers = yield Customer.count().exec();
  });

  app.options('*', function *(next) {
    this.status = 204;
  });

};
