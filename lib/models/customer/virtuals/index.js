var asserts = require('./asserts');
var getters = require('./getters');
var setters = require('./setters');

module.exports = function(schema) {

  /**
   * The complete name of a customer.
   *
   * @type {String}
   */
  schema.path('name')
    .required()
    .set(setters.trim)
    .set(setters.capitalize)
    .validate(asserts.alpha)
    .validate(asserts.length)
    ;

  /**
   * The email address of a customer.
   *
   * @type {String}
   */
  schema.path('email')
    .required()
    .set(setters.spaceless)
    .set(setters.lowercase)
    .validate(asserts.email)
    ;

  /**
   * The image object of a customer.
   *
   * @type {Object}
   */
  schema.virtual('image')
    .get(getters.image);

  /**
   * The optional company of a customer.
   *
   * @type {String}
   */
  schema.path('company')
    .set(setters.trim)
    .validate(asserts.length)
    .validate(asserts.alphanum)
    ;

  /**
   * The zip code of a customer.
   *
   * @type {Number}
   */
  schema.path('address.zip')
    .validate(asserts.zipcode)
    ;

  /**
   * The city or place of a customer.
   *
   * @type {String}
   */
  schema.path('address.city')
    .required()
    .set(setters.trim)
    .set(setters.capitalize)
    .validate(asserts.length)
    .validate(asserts.alphanum)
    ;

  /**
   * The street with street number of a customer.
   *
   * @type {String}
   */
  schema.path('address.street')
    .set(setters.trim)
    .set(setters.capitalize)
    .validate(asserts.length)
    .validate(asserts.alphanum)
    ;

};
