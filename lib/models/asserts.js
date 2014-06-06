var validator = require('validator');

/**
 * Returns true if value is alphanum.
 *
 * @param {String} value
 * @return {Boolean}
 */
exports.email = function(value) {
  return validator.isEmail(value);
};

/**
 * Returns true if value is alpha.
 *
 * @param {String} value
 * @return {Boolean}
 */
exports.alpha = function(value) {
  return validator.isAlpha(sanitize(value));
};

/**
 * Returns true if value is alphanum.
 *
 * @param {String} value
 * @return {Boolean}
 */
exports.alphanum = function(value) {
  return validator.isAlphanumeric(sanitize(value));
};

/**
 * Returns true if value has arguable length.
 *
 * @param {String} value
 * @return {Boolean}
 */
exports.length = function(value) {
  return validator.isLength(value, 3, 50);
};

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
 * Returns true if value is zipcode.
 *
 * @param {Number} value
 * @return {Boolean}
 */
exports.zipcode = function(value) {
  if (value > 99999) return false;
  if (value < 10000) return false;
  if (value % 1 !== 0) return false;

  return true;
};

// workaround to allow german characters,
// spaces and dots on alpha* constrains
function sanitize(value) {
  value = value || '';

  return value
    .replace('ß', 'ss')
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
    .replace('Ä', 'Ae')
    .replace('Ö', 'Oe')
    .replace('Ü', 'Ue')
    .replace(/\s/g, '')
    .replace(/\./g, '');
}
