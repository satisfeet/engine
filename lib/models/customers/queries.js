var squel  = require('squel');
var lodash = require('lodash');

exports.select = function(options) {
  var query = squel.select().from('customers');

	lodash.forIn(options, function(value, key) {
		query.where(key, value);
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

	lodash.forIn(document, function(value, key) {
		if (lodash.isFunction(value)) return;
		if (lodash.isUndefined(value)) return;

		query.where(key, value);
	});

  return query.toString();
};
