var lodash = require('lodash');

/**
 * Performs an "equals id" query.
 *
 * @param {String} value
 * @param {Object} query
 * @return {Object}
 */
exports.id = function(value, query) {
  if (value) query._id = value;

  return query;
};

/**
 * Performs a "pseudo text search" query.
 *
 * @param {String} value
 * @param {Object} query
 * @return {Object}
 */
exports.search = function(value, query) {
  if (lodash.isString(value)) {
    var regex = new RegExp(value);

    query.$or = [
      { name: regex },
      { email: regex },
      { company: regex },
      { address: { city: regex } },
      { address: { street: regex } }
    ];
  }

  return query;
};

/**
 * Performs an "equals filter" query.
 *
 * @param {Object} value
 * @param {Object} query
 * @return {Object}
 */
exports.filter = function(value, query) {
  if (lodash.isPlainObject(value)) {
    var prefix = '';
    lodash.forIn(value, function filter(value, key) {
      if (lodash.isPlainObject(value)) {
        prefix = key + '.';
        lodash.forIn(value, filter);
      } else {
        query[prefix + key] = new RegExp(value);
      }
    });
  }

  return query;
}