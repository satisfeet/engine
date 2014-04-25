var mongoose = require('mongoose');

var Product = mongoose.model('Product');

exports.search = function *(next) {
  yield next;

  this.body = 'Hello World';
};
