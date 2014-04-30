var validator = require('validator');

module.exports = function(app, schema) {

  schema.path('products').required().validate(function(value) {
    if (value.length < 1) return false;

    return true;
  });

  schema.path('customer').required().validate(function(value) {
    return true;
  });

  schema.path('state.created').required().default(new Date());

};
