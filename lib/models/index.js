var monk     = require('monk');
var lodash   = require('lodash');
var mongoose = require('mongoose');

var Product  = require('./product2');
var Customer = require('./customer');

module.exports = function(app) {

  app.context.db = monk(app.storage.url);

  mongoose.connect(app.storage.url);

  mongoose.plugin(require('./options'));

  mongoose.plugin(require('./methods'));

  require('./customer')(app);

  require('./product')(app);

  require('./article')(app);

  require('./order')(app);

  lodash.merge(app.context, {
    Product: bind(Product, app.context.db.get('products')),
    Customer: bind(Customer, app.context.db.get('customers'))
  });

};

function bind(model, collection) {
  model.collection = collection;

  return model;
}
