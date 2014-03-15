var Builder = require('./builder');

var builder = new Builder('customers', [
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
  var query = builder.createSelectQuery(options);

  query.ident(options.id);
  query.limit(options.limit);
  query.search(options.search);
  query.filter(options.filter);

  return query.toString();
};

exports.insert = function(options) {
  var query = builder.createInsertQuery();

  query.set(options);

  return query.toString();
};

exports.update = function(options) {
  var query = builder.createUpdateQuery();

  query.set(options);
  query.ident(options.id);

  return query.toString();
};

exports.delete = function(options) {
  var query = builder.createDeleteQuery();

  query.ident(options.id);
  query.limit(options.limit);

  return query.toString();
};
