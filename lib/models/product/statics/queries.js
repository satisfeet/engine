/**
 * Performs an "equals _id" query.
 *
 * @param {String} value
 * @param {Query} query
 */
exports.id = function(value, query) {
  if (!value) return;

  query.where('_id').equals(value);
};
