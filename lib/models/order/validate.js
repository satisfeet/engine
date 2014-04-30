var mongoose  = require('mongoose');
var validator = require('validator');

module.exports = function(app, schema) {

  var Product = mongoose.models.Product;
  var Customer = mongoose.models.Customer;

  schema.path('customer').required().validate(function(value, done) {
    Customer.count({ _id: value }, function(err, result) {
      if (err) throw err;

      done(result);
    });
  });

  schema.path('products').required().validate(function(value) {
    if (value.length < 1) return false;

    return true;
  });

  schema.path('products')
    .schema.path('price').required().validate(function(value) {
      if (value < 0) return false;

      return true;
    });

  schema.path('products')
    .schema.path('quantity').required().validate(function(value) {
      if (value < 1) return false;

      return true;
    });

  schema.path('products')
    .schema.path('product').required().validate(function(value, done) {
      Product.count({ _id: value }, function(err, result) {
        if (err) throw err;

        done(result);
      });
    });

  schema.path('state.created').required().default(new Date());

};
