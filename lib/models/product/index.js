var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var schema = new Schema({
  title: String,
  details: Object,
  pricing: {
    retail: Number
  },
  derivates: [
    require('./derivate')
  ]
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
  .trim()

/**
 * The pricing of the product.
 *
 * @type {Object}
 */
schema.path('pricing.retail')
  .required()
  .min(0.00)
  .steps(0.01)
  .round(2)

/**
 * Returns reduced variations of derivates.
 *
 * @type {Object}
 */
schema.virtual('variations')
  .get(function() {
    return this.derive('variations');
  });

schema.statics = require('./statics');

schema.methods = require('./methods');

mongoose.model('Product', schema);
