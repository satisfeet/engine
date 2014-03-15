var squel  = require('squel');
var lodash = require('lodash');

const FIELDS = ['company', 'surname', 'forename', 'email', 'street', 'city'];

exports.select = function(options) {
  var query = squel.select().from('customers');

	if (options.query) {
		addSearchWhere(query, options.query);
	}
	if (options.filter) {
		addFilterWhere(query, options.filter);
	}

	return query;
};

exports.selectOne = function(options) {
  var query = squel.select().from('customers');

	return addIdWhere(query, options.id).limit(1);
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

	return addIdWhere(query, document.id);
};

function addIdWhere(query, id) {
	query.where('id = ?', id);

	return query;
}

function addSearchWhere(query, keyword) {
	var expr = squel.expr();

	lodash.forEach(FIELDS, function(field) {
		expr.or(field + ' LIKE "%' + keyword + '%"');
	});

	return query.where(expr);
}

function addFilterWhere(query, filter) {
	lodash.forEach(FIELDS, function(field) {
		if (!filter[field]) return;

		query.where(field + ' LIKE ?', '%' + filter[field] + '%');
	});

	return query;
}
