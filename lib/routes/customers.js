var mongoose = require('mongoose');

var Customer = mongoose.model('Customer');

exports.create = function *(next) {
  var body = this.body;

  this.body = yield Customer.create(body);
};

exports.search = function *(next) {
  var query = this.query;

  this.body = yield Customer.findBy(query);
};

exports.display = function *(customer, next) {
  this.body = yield Customer.findOneById(customer);
};

exports.update = function *(customer, next) {
  this.body = yield Customer.findOneByIdAndUpdate(customer);
};

exports.remove = function *(customer, next) {
  this.body = yield Customer.findOneByIdAndRemove(customer);
};
