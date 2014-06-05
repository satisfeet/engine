var lodash = require('lodash');

/**
 * Performs an "equals _id" condition.
 *
 * @param {String} value
 * @param {Query} query
 */
exports.id = function(value, query) {
  if (value) query.where('_id').equals(value);
};

/**
 * Performs an "equals filter" condition.
 *
 * @param {Object} value
 * @param {Query} query
 */
exports.filter = function(value, query) {
  if (lodash.isPlainObject(value)) {
    var prefix = '';
    lodash.forIn(value, function resolve(value, key) {
      if (lodash.isPlainObject(value)) {
        prefix = key + '.';
        lodash.forIn(value, resolve);
      }
      if (lodash.isString(value)) {
        query.regex(prefix + key, new RegExp(value));
      }
    });
  }
};

/**
 * Performs a "pseudo text search" condition.
 *
 * @param {String} value
 * @param {Query} query
 */
exports.search = function(value, query) {
  if (lodash.isString(value)) {
    var regex = new RegExp(value);

    query.or([
      { name: regex },
      { email: regex },
      { company: regex },
      { address: { city: regex } },
      { address: { street: regex } }
    ]);
  }
};
