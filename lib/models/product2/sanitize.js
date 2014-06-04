var lodash = require('lodash');

/**
 * Returns trimmed title.
 *
 * @param {String} value
 * @return {String}
 */
exports.title = function(value) {
  return value
    .trim();
};

/**
 * Returns raw details.
 *
 * @param {Object} value
 * @return {Object}
 */
exports.details = function(value) {
  return value;
};

/**
 * Returns remapped pricing.
 *
 * @param {Object} value
 * @return {Object}
 */
exports.pricing = function(value) {
  return {
    retail: this.retail(value)
  };
};

/**
 * Returns rounded pricing retail.
 *
 * @param {Number} value
 * @return {Number}
 */
exports.pricing.retail = function(value) {
  value = Number(value);

  return Number(value.toFixed(2));
};

/**
 * Returns raw articles array.
 *
 * @param {Array} value
 * @return {Array}
 */
exports.articles = function(value) {
  return value;
};
