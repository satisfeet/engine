var squel  = require('squel');
var lodash = require('lodash');

exports.create = function(document) {
  var query = squel.insert().into('customers');

  lodash.forIn(document, function(value, key) {
    query.set(key, value);
  });

  return query.toString();
};

exports.findBy = function(options) {
  var query = squel.select().from('customers');

  return query.toString();
};

exports.findOneBy = function(options) {
  var query = squel.select().from('customers');

  query.where('id', options.id);
  query.limit(1);

  return query.toString();
};

exports.destroy = function(document) {
  var query = squel.remove().from('customers');

  query.where('id = ?', document.id);

  return query.toString();
};
