var lodash = require('lodash');

/**
 * Performs an "equals id" query.
 *
 * @param {String} value
 * @param {Object} query
 * @return {Object}
 */
exports.id = function(value, query) {
  if (value) query.id = value;

  return query;
};
