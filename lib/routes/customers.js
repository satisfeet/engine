exports.list = function *(next) {
  this.body = yield this.customers.find(this.query);
};

exports.show = function *(param, next) {
  this.body = yield this.customers.findById(param);
};

exports.insert = function *(next) {
  this.body = yield this.customers.insert(this.body);
};

exports.update = function *(param, next) {
  this.body = 'Not available';
};

exports.remove = function *(param, next) {
  this.body = 'Not available';
};
