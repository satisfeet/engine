var mongoose = require('mongoose');

var asserts = require('../asserts');
var setters = require('../setters');

var schema = new mongoose.Schema({
  title: String,
  details: Object,
  pricing: {
    retail: Number
  },
  articles: [
    {
      ref: 'Article',
      type: mongoose.Schema.ObjectId
    }
  ]
});

/**
 * The title of the product.
 *
 * @type {String}
 */
schema.path('title')
  .required()
  .set(setters.trim)
  .validate(asserts.alpha)
  .validate(asserts.length)

/**
 * The pricing of the product.
 *
 * @type {Object}
 */
schema.path('pricing.retail')
  .required()
  .set(setters.round)
  .validate(asserts.price)

/**
 * The aggregated variations of product.
 *
 * @type {Object}
 */
schema.virtual('variations')
  .get(function() {
    return this.aggregateVariations();
  })

schema.statics = require('./statics');

schema.methods = require('./methods');

mongoose.model('Product', schema);
