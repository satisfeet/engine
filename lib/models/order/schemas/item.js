var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var Product = mongoose.models.Product;

var schema = new Schema({
  product: {
    ref: 'Product',
    type: ObjectId
  },
  derivate: Object,
  quantity: Number,
  price: Number
});

/**
 * Article which the item wraps.
 *
 * @type {Array}
 */
schema.path('product')
  .required()
  .validate(function(value, done) {
    Product.count({ _id: value }, function(err, result) {
      if (err) throw err;

      done(!!result);
    });
  })

/**
 * Final price of an article.
 *
 * @type {Number}
 */
schema.path('price')
  .required()
  .min(0)
  .steps(0.01)

/**
 * Quantity of the article.
 *
 * @type {Number}
 */
schema.path('quantity')
    .required()
    .min(0)
    .steps(1)

module.exports = schema;
