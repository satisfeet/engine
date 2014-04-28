var validator = require('validator');

module.exports = function(app, schema) {

  schema.path('name').unique().required().validate(function(value) {
    return true;
  });

  schema.path('price').required().validate(function(value) {
    return true;
  });

};
