var lodash    = require('lodash');
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

  schema.path('products').validate(function(value) {
    if (value.length < 1) return false;

    var valid = true;
    value.forEach(function(value) {
      if (!value.price) valid = false;
      if (value.price < 0) valid = false;
      if (!value.quantity) valid = false;
      if (value.quantity < 1) valid = false;
      if (value.quantity % 1 !== 0) valid = false;
    });

    return valid;
  });

  schema.path('products').required().validate(function(value, done) {
    if (value.length < 1) return done(false);

    Product.count()
      .or(value.map(function(value) {
        return value.product._id;
      }))
      .exec(function(err, result) {
        if (err) throw err;

        done(result);
      });
  });

  schema.path('state.created').required().default(new Date());

};
