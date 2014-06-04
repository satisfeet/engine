var co = require('co');

var product = {
  title: 'Casual Socks',
  details: {
    material: {
      cotton: 0.99,
      plastic: 0.01
    }
  },
  pricing: {
    retail: 2.99
  }
};

exports.create = co(function*() {
  this.product = yield this.db.get('products').insert(product);
});

exports.remove = co(function*() {
  this.product = yield this.db.get('products').remove();
});
