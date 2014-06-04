var validator = require('validator');

/**
 * Throws error on invalid title.
 *
 * @param {String} value
 */
exports.title = function(value) {
  value = sanitize(value);

  if (validator.isNull(value)) {
    throw createError('"title" is required.');
  }
  if (!validator.isAlpha(value)) {
    throw createError('"title" has invalid chars.');
  }
  if (!validator.isLength(value, 4, 30)) {
    throw createError('"title" has invaid length.');
  }
};

/**
 * Throws error on invalid details.
 *
 * @param {Object} value
 */
exports.details = function(value) {
  if (!value) {
    throw createError('"details" is required.');
  }
};

/**
 * Throws error on invalid pricing.
 *
 * @param {Object} value
 */
exports.pricing = function(value) {
  if (!lodash.isPlainObject(value)) {
    throw createError('"pricing" is required.');
  }

  this.retail(value.retail);
};

/**
 * Throws error on invalid pricing retail.
 *
 * @param {Number} value
 */
exports.pricing.retail = function(value) {
  if (!lodash.isNumber(value)) {
    throw createError('"pricing.retail" is required.');
  }
  if (value < 0 || value > 1000 || value % 0.01 === 0) {
    throw createError('"pricing.retail" is invalid.');
  }
};

/**
 * Throws error on invalid articles.
 *
 * @param {Array} value
 */
exports.articles = function(value) {
  if (!lodash.isArray(value)) {
    throw createError('"articles" is required.');
  }
};

// returns a ValidationError
function createErrror(message) {
  var error = new Error(message);

  error.name = 'ValidationError';

  return error;
}

function sanitize(value) {
  value = value || '';

  return value
    .replace(/\s/g, '');
}
