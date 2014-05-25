var validator = require('validator');

module.exports = function(app, schema) {

  schema.path('title').required().validate(function(value) {
    if (validator.isNull(value)) return false;
    if (!validator.isLength(value, 4, 40)) return false;
    if (!validator.isAlpha(value.split(' ').join(''))) return false;

    return true;
  });

  schema.path('pricing.retail').required().validate(function(value) {
    if (value < 0) return false;
    if (value > 1000) return false;

    return true;
  });

};

function isString(value) {
  return typeof value === 'string';
}
