var validator = require('validator');

/**
 * Returns true if value is price.
 *
 * @param {Number} value
 * @return {Boolean}
 */
exports.price = function(value) {
  if (value < 0) return false;
  if (value > 1000) return false;
  if (value / 0.01 % 1 !== 0) return false;

  return true;
};

/**
 * Returns true if value has valid length.
 *
 * @param {String} value
 * @return {Boolean}
 */
exports.length = function(value) {
  return validator.isLength(value, 4, 40);
};
