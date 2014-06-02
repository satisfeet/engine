var monk     = require('monk');
var lodash   = require('lodash');
var mongoose = require('mongoose');

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
    Customer: bind(Customer, app.context.db.get('customers'))
  });

};

function bind(model, collection) {
  model.collection = collection;

  return model;
}
