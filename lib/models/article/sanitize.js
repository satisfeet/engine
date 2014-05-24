module.exports = function(app, schema) {

  schema.path('title').set(function(value) {
    return value.trim();
  });

  schema.path('image.url').set(function(value) {
    return value.trim().toLowerCase();
  });

  schema.path('types').caster.set(function(value) {
    return value.trim().toLowerCase();
  });

  schema.path('pricing.retail').set(function(value) {
    return +value.toFixed(2);
  });

  schema.path('description').set(function(value) {
    return value.trim();
  });

};
