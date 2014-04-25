var mongoose = require('mongoose');

var Customer = mongoose.model('Order');

exports.search = function *(next) {
  yield next;

  this.body = 'Hello World';
};
