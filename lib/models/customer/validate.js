var lodash    = require('lodash');
var validator = require('validator');

var model = require('../model');

exports.name = function(value) {
  value = sanitize(value);

  if (validator.isNull(value)) {
    throw new model.ValidationError('"name" is required.');
  }
  if (!validator.isAlpha(value)) {
    throw new model.ValidationError('"name" has invalid chars.');
  }
  if (!validator.isLength(value, 5, 40)) {
    throw new model.ValidationError('"name" has invalid length.');
  }
};

exports.email = function(value) {
  if (validator.isNull(value)) {
    throw new model.ValidationError('"email" is required.');
  }
  if (!validator.isEmail(value)) {
    throw new model.ValidationError('"email" is not an email.');
  }
  if (!validator.isLength(value, 6, 40)) {
    throw new model.ValidationError('"email" has invalid length.');
  }
};

exports.company = function(value) {
  if (validator.isNull(value)) return;

  if (!validator.isAlphanumeric(value)) {
    throw new model.ValidationError('"company" has invalid chars.');
  }
  if (!validator.isLength(value, 3, 40)) {
    throw new model.ValidationError('"company" has invalid length.');
  }
};

exports.address = function(value) {
  if (!value) {
    throw new model.ValidationError('"address" is required.');
  }
  if (!lodash.isPlainObject(value)) {
    throw new model.ValidationError('"address" is not an object.');
  }
};

exports.address.zip = function(value) {
  if (!value) return;

  if (!lodash.isNumber(value)) {
    throw new model.ValidationError('"address.zip" is not number.');
  }
  if (value <= 10000 || value > 99999) {
    throw new model.ValidationError('"address.zip" has invalid size.');
  }
};

exports.address.city = function(value) {
  if (validator.isNull(value)) {
    throw new model.ValidationError('"address.city" is required.');
  }

  value = sanitize(value);

  if (!validator.isAlphanumeric(value)) {
    throw new model.ValidationError('"address.city" has invalid chars.');
  }
  if (!validator.isLength(value, 3, 30)) {
    throw new model.ValidationError('"address.city" has invalid length.');
  }
};

exports.address.street = function(value) {
  if (validator.isNull(value)) return;

  value = sanitize(value);

  if (!validator.isAlphanumeric(value)) {
    throw new model.ValidationError('"address.street" has invalid chars.');
  }
  if (!validator.isLength(value, 5, 60)) {
    throw new model.ValidationError('"address.street" has invalid length.');
  }
};

// this will replace all non-alpha chars
// which however still are in use commonly
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
