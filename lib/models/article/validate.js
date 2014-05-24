var validator = require('validator');

module.exports = function(app, schema) {

  schema.path('title').required().validate(function(value) {
    if (validator.isNull(value)) return false;
    if (!validator.isLength(value, 4, 40)) return false;
    if (!validator.isAlpha(value.split(' ').join(''))) return false;

    return true;
  });

  schema.path('types').required().validate(function(value) {
    if (!value.length) return false;

    return true;
  });

  schema.path('details').required().validate(function(value) {
    if (Object(value) !== value) return false;
    if (!Object.keys(value).length) return false;

    return true;
  });

  schema.path('image.url').validate(function(value) {
    if (!validator.isURL(value)) return false;

    return true;
  });

  schema.path('pricing.retail').required().validate(function(value) {
    if (value < 0) return false;
    if (value > 1000) return false;

    return true;
  });

};
