exports.list = function* list(next) {
  this.body = yield this.app.customers.find(this.query);
};

exports.show = function* show(param, next) {
  this.body = yield this.app.customers.findById(param);
};

exports.insert = function* insert(next) {
  this.body = yield this.app.customers.insert(this.body);
};

exports.update = function* update(param, next) {
  this.body = 'Not available';
};

exports.remove = function* remove(param, next) {
  this.body = 'Not available';
};
