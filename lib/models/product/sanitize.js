module.exports = function(app, schema) {

  schema.path('name').set(function(value) {
    return value.trim();
  });

  schema.path('price').set(function(value) {
    return +value.toFixed(2);
  });

};
