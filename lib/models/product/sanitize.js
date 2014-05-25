module.exports = function(app, schema) {

  schema.path('title').set(function(value) {
    return value.trim();
  });

  schema.path('pricing.retail').set(function(value) {
    return +value.toFixed(2);
  });

};