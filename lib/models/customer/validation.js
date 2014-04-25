module.exports = function(app, schema) {

  schema.path('name').validate(function(value) {
    if (value.length === 0) return false;

    return true;
  });

  schema.path('email').validate(function(value) {
    if (value.length === 0) return false;
    if (value.indexOf('@') === -1) return false;

    return true;
  });

};
