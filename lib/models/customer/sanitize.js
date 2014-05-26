module.exports = function(schema) {

  schema.path('name').trim();

  schema.path('email').trim().lowercase();

  schema.path('company').trim();

  schema.path('address.street').trim();

  schema.path('address.city').trim();

};
