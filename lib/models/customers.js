var Builder = require('./builder');

var customers = new Builder('customers', [
  'id',
  'email',
  'forename',
  'surname',
  'company',
  'street',
  'street_nr',
  'city',
  'zip'
]);

exports.select = function(options) {
  var query = customers.createSelectQuery(options);

  query.ident(options.id);
  query.limit(options.limit);
  query.search(options.search);
  query.filter(options.filter);

  return query.toString();
};

exports.insert = function(options) {
  var query = customers.createInsertQuery();

  query.set(options);

  return query.toString();
};

exports.update = function(options) {
  var query = customers.createUpdateQuery();

  query.set(options);
  query.ident(options.id);

  return query.toString();
};

exports.delete = function(options) {
  var query = customers.createDeleteQuery();

  query.ident(options.id);
  query.limit(options.limit);

  return query.toString();
};
