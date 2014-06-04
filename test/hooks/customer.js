var co = require('co');

var customer = {
  name: 'Bodo Kaiser',
  email: 'i@bodokaiser.io',
  company: 'Satisfeet',
  address: {
    street: 'Geiserichstr. 3',
    city: 'Berlin',
    zip: 12105
  }
};

exports.create = co(function*() {
  this.customer = yield this.db.get('customers').insert(customer);
});

exports.remove = co(function*() {
  this.customer = yield this.db.get('customers').remove();
});
