var sql    = require('sql');
var lodash = require('lodash');

var customer = sql.define({
  name: 'customers',
  columns: [
    'id',
    'surname',
    'forename',
    'company',
    'email',
    'street',
    'street_nr',
    'city',
    'zip'
  ],
  snakeToCamel: true
});

exports.select = function(options) {
  var query = customer.select();

  if (options && options.id) {
    query.where(customer.id.equals(options.id));
  }
  if (options && options.search) {
    query.where(customer.id.like(options.search));

    lodash.forIn(customer.columns, function(column) {
      if (!customer.hasOwnProperty(column.name)) return;

      query.or(customer[column.name].like('%' + options.search + '%'));
    });
  }
  if (options && options.filter) {
    lodash.forIn(customer.columns, function(column) {
      var filter = options.filter[column.name];

      if (filter) {
        query.where(customer[column.name].like('%' + filter + '%'));
      }
    });
  }
  if (options && options.limit) {
    query.limit(options.limit);
  }

  return query.toString();
};

exports.insert = function(options) {
  var query = customer.insert(options);

  return query.toString();
};

exports.delete = function(options) {
  var query = customer.delete();

  if (options.id) {
    query.where(customer.id.equals(options.id));
  }

  return query.toString();
};
