var squel  = require('squel');
var lodash = require('lodash');

const FIELDS = ['company', 'surname', 'forename', 'email', 'street', 'city'];

exports.select = function(options) {
  var query = squel.select().from('customers');

	lodash.forEach(FIELDS, function(field) {
		if (!options.hasOwnProperty(field)) return;

		query.where(field + ' LIKE ?', '%' + options[field] + '%');
	});

  return query.toString();
};

exports.selectOne = function(options) {
  var query = squel.select().from('customers');

	lodash.forIn(options, function(value, key) {
		query.where(key, value);
	});
  query.limit(1);

  return query.toString();
};

exports.insert = function(document) {
  var query = squel.insert().into('customers');

  lodash.forIn(document, function(value, key) {
    query.set(key, value);
  });

  return query.toString();
};

exports.delete = function(document) {
  var query = squel.delete().from('customers');

	query.where('id = ?', document.id);

  return query.toString();
};
