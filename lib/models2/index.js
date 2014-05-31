var monk   = require('monk');
var lodash = require('lodash');

var Customer = require('./customer');

module.exports = function(app) {

  var db = monk(app.storage.url);

  lodash.merge(app.context, {
    Customer: bind(Customer, db.get('customers'))
  });

};

function bind(model, collection) {
  model.collection = collection;

  return model;
}
