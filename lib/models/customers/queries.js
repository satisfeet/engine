var squel  = require('squel');
var lodash = require('lodash');

const FIELDS = ['company', 'surname', 'forename', 'email', 'street', 'city'];

exports.select = function(options) {
  var query = squel.select().from('customers');

	if (options.query) {
		var expr = squel.expr();

		lodash.forEach(FIELDS, function(field) {
			expr.or(field + ' LIKE "%' + options.query + '%"');
		});

		query.where(expr);
	} else {
		lodash.forEach(FIELDS, function(field) {
			if (!options[field]) return;

			query.where(field + ' LIKE ?', '%' + options[field] + '%');
		});
	}

  return query;
};

exports.selectOne = function(options) {
  var query = squel.select().from('customers');

	query.where('id = ?', options.id);
  query.limit(1);

  return query;
};

exports.insert = function(document) {
  var query = squel.insert().into('customers');

  lodash.forIn(document, function(value, key) {
    query.set(key, value);
  });

  return query;
};

exports.delete = function(document) {
  var query = squel.delete().from('customers');

	query.where('id = ?', document.id);

  return query;
};
