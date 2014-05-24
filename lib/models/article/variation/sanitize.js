module.exports = function(app, schema) {

  schema.path('image.url').set(function(value) {
    return value.trim().toLowerCase();
  });

  schema.path('pricing.retail').set(function(value) {
    return +value.toFixed(2);
  });

};
