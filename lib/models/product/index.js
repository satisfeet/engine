var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var schema = new Schema({
  title: String,
  image: {
    url: String
  },
  details: Object,
  pricing: {
    retail: Number
  },
  variations: [
    require('./schemas/variation')
  ],
  description: String
});

/**
 * The title of the product.
 *
 * @type {String}
 */
schema.path('title')
  .required()
  .alpha()
  .length(5, 40)
  .trim();

/**
 * The product image url.
 *
 * @type {Object}
 */
schema.path('image.url')
  .required()
  .lowercase();

/**
 * The pricing of the product.
 *
 * @type {Object}
 */
schema.path('pricing.retail')
  .required()
  .min(0.00)
  .steps(0.01)
  .round(2);

/**
 * The product description.
 *
 * @type {String}
 */
schema.path('description')
  .length(20, 300)
  .alpha()
  .trim();

schema.statics = require('./statics');

schema.methods = require('./methods');

mongoose.model('Product', schema);
