/**
 * Returns trimmed value.
 *
 * @param {String} value
 * @return {String}
 */
exports.trim = function(value) {
  return value.trim();
};

/**
 * Returns rounded number.
 *
 * @param {Number} value
 * @return {Number}
 */
exports.round = function(value) {
  return +value.toFixed(2);
};
