var lodash    = require('lodash');
var mongoose  = require('mongoose');
var validator = require('validator');

module.exports = function(app, schema) {

  var Article = mongoose.models.Article;
  var Customer = mongoose.models.Customer;

  schema.path('customer').required().validate(function(value, done) {
    Customer.count({ _id: value }, function(err, result) {
      if (err) throw err;

      done(result);
    });
  });

  schema.path('articles').validate(function(value) {
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

  schema.path('articles').required().validate(function(value, done) {
    if (value.length < 1) return done(false);

    Article.count()
      .or(value.map(function(value) {
        return value.article._id;
      }))
      .exec(function(err, result) {
        if (err) throw err;

        done(result);
      });
  });

  schema.path('state.created').required().default(new Date());

};
