var asserts = require('./asserts');
var getters = require('./getters');
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
   * The aggregated details available.
   *
   * @type {Object}
   */
  schema.path('details')
    .get(getters.details)
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

};
