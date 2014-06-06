var asserts = require('./asserts');
var setters = require('./setters');

module.exports = function(schema) {

  /**
   * The title of the product.
   *
   * @type {String}
   */
  schema.path('title')
    .required()
    .set(setters.trim)
    .validate(asserts.length)
    ;

  /**
   * The global product details (e.g. material).
   *
   * @type {Object}
   */
  schema.path('details')
    ;

  /**
   * The pricing of the product.
   *
   * @type {Object}
   */
  schema.path('pricing.retail')
    .required()
    .set(setters.round)
    .validate(asserts.price)
    ;

  /**
   * The aggregated variations of product.
   *
   * @type {Object}
   */
  schema.virtual('variations')
    .get(function() {
      return this.aggregateVariations();
    })
    ;

};
