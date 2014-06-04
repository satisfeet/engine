var lodash    = require('lodash');
var validator = require('validator');

/**
 * Throws error on invalid name.
 *
 * @param {String} value
 */
exports.name = function(value) {
  value = sanitize(value);

  if (validator.isNull(value)) {
    throw createError('"name" is required.');
  }
  if (!validator.isAlpha(value)) {
    throw createError('"name" has invalid chars.');
  }
  if (!validator.isLength(value, 5, 40)) {
    throw createError('"name" has invalid length.');
  }
};

/**
 * Throws error on invalid email.
 *
 * @param {String} value
 */
exports.email = function(value) {
  if (validator.isNull(value)) {
    throw createError('"email" is required.');
  }
  if (!validator.isEmail(value)) {
    throw createError('"email" is not an email.');
  }
  if (!validator.isLength(value, 6, 40)) {
    throw createError('"email" has invalid length.');
  }
};

/**
 * Throws error on invalid company.
 *
 * Property is optional..
 *
 * @param {String} valaue
 */
exports.company = function(value) {
  if (validator.isNull(value)) return;

  if (!validator.isAlphanumeric(value)) {
    throw createError('"company" has invalid chars.');
  }
  if (!validator.isLength(value, 3, 40)) {
    throw createError('"company" has invalid length.');
  }
};

/**
 * Throws error on invalid address.
 *
 * @param {Object} value
 */
exports.address = function(value) {
  if (!value) {
    throw createError('"address" is required.');
  }
  if (!lodash.isPlainObject(value)) {
    throw createError('"address" is not an object.');
  }
};

/**
 * Throws error on invalid address zip code.
 *
 * @param {Number} value
 */
exports.address.zip = function(value) {
  if (!value) return;

  if (!lodash.isNumber(value)) {
    throw createError('"address.zip" is not number.');
  }
  if (value <= 10000 || value > 99999) {
    throw createError('"address.zip" has invalid size.');
  }
};


/**
 * Throws error on invalid address city.
 *
 * @param {String} value
 */
exports.address.city = function(value) {
  if (validator.isNull(value)) {
    throw createError('"address.city" is required.');
  }

  value = sanitize(value);

  if (!validator.isAlphanumeric(value)) {
    throw createError('"address.city" has invalid chars.');
  }
  if (!validator.isLength(value, 3, 30)) {
    throw createError('"address.city" has invalid length.');
  }
};

/**
 * Throws error on invalid address street.
 *
 * @param {String} value
 */
exports.address.street = function(value) {
  if (validator.isNull(value)) return;

  value = sanitize(value);

  if (!validator.isAlphanumeric(value)) {
    throw createError('"address.street" has invalid chars.');
  }
  if (!validator.isLength(value, 5, 60)) {
    throw createError('"address.street" has invalid length.');
  }
};

// Workaround to create a ValidationError object without inheritance.
// Will be replaced when we have a proper model library.
function createError(message) {
  var error = new Error(message);

  error.name = 'ValidationError';

  return error;
}

// Workaround to allow german characters, spaces and dots on alpha* constrains.
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
