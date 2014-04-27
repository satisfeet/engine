var lodash    = require('lodash');
var validator = require('validator');

module.exports = function(app, schema) {

  schema.path('name').required().validate(function(value) {
    if (!validator.isLength(value, 4, 40)) return false;
    if (!validator.isAlpha(value.split(' ').join(''))) return false;

    return true;
  });

  schema.path('email').required().validate(function(value) {
    if (!validator.isLength(value, 6, 40)) return false;
    if (!validator.isEmail(value)) return false;

    return true;
  });

  schema.path('company').validate(function(value) {
    if (!validator.isLength(value, 4, 30)) return false;
    if (!validator.isAlpha(value)) return false;

    return true;
  });

  schema.path('address.street').validate(function(value) {
    if (validator.isNull(value)) return false;
    if (!validator.isLength(value, 5)) return false;

    return true;
  });

  schema.path('address.city').validate(function(value) {
    if (validator.isNull(value)) return false;
    if (!validator.isAlpha(value)) return false;
    if (!validator.isLength(value, 4)) return false;

    return true;
  });

  schema.path('address.zip').validate(function(value) {
    if (value > 99999) return false;
    if (value < 10000) return false;

    return true;
  });

};
