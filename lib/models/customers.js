var squel  = require('squel');
var lodash = require('lodash');

const FIELDS = [
  'id',
  'email',
  'forename',
  'surname',
  'company',
  'street',
  'street_nr',
  'city',
  'zip'
];

exports.select = function(options) {
  var query = squel.select().from('customers');

  addLimit(query, options);
  addFields(query, options);
  addWhereId(query, options);
  addWhereSearch(query, options);
  addWhereFilter(query, options);

  return query.toString();
};

exports.insert = function(options) {
  var query = squel.insert().into('customers');

  addSets(query, options);

  return query.toString();
};

exports.update = function(options) {
  var query = squel.update().table('customers');

  addSets(query, options);

  return query.toString();
};

exports.delete = function(options) {
  var query = squel.delete().from('customers');

  addWhereId(query, options);

  return query.toString();
};

function addSets(query, options) {
  lodash.forEach(FIELDS, function(field) {
    var value = options[field];

    query.set(field, value || null);
  });
}

function addLimit(query, options) {
  if (!lodash.isNumber(options.limit)) return;

  query.limit(options.limit);
}

function addFields(query, options) {
  lodash.forEach(FIELDS, function(field) {
    query.field('customers.' + field);
  });
}

function addWhereId(query, options) {
  if (!options.id) return;

  query.where('customers.id = ?', options.id);
}

function addWhereFilter(query, options) {
  if (!lodash.isPlainObject(options.filter)) return;

  lodash.forEach(FIELDS, function(field) {
    var value = options.filter[field];

    if (!value) return;

    query.where('customers.' + field + ' LIKE ?', '%' + value + '%');
  });
}

function addWhereSearch(query, options) {
  if (!lodash.isString(options.search)) return;

  var expr = squel.expr();
  var value = options.search;

  lodash.forEach(FIELDS, function(field) {
    expr.or('customers.' + field + ' LIKE "%' + value + '%"');
  });

  query.where(expr);
}
