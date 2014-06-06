/**
 * Returns trimmed value.
 *
 * @param {String} value
 * @return {String}
 */
exports.trim = function(value) {
  return value.replace(/\s{2,}/g, ' ').trim();
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

/**
 * Returns spaceless value.
 *
 * @param {String} value
 * @return {String}
 */
exports.spaceless = function(value) {
  return value.replace(/\s/g, '');
};

/**
 * Returns lower cased value.
 *
 * @param {String} value
 * @return {String}
 */
exports.lowercase = function(value) {
  return value.toLowerCase();
};

/**
 * Returns capitalized value.
 *
 * @param {String} value
 * @return {String}
 */
exports.capitalize = function(value) {
  var parts = value.split(' ');

  return parts.map(function(value) {
    var char = value.substr(0, 1).toUpperCase();
    var rest = value.substr(1).toLowerCase();

    return char + rest;
  }).join(' ');
};
