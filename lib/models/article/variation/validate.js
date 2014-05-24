var validator = require('validator');

module.exports = function(app, schema) {

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
