var mongoose = require('mongoose');

var asserts = require('../asserts');
var setters = require('../setters');

var schema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  address: {
    street: String,
    city: String,
    zip: Number
  }
});

/**
 * Customers complete name.
 *
 * @type {String}
 */
schema.path('name')
  .index()
  .required()
  .set(setters.trim)
  .set(setters.capitalize)
  .validate(asserts.alpha)
  .validate(asserts.length)

/**
 * Customers email address.
 *
 * @type {String}
 */
schema.path('email')
  .unique()
  .required()
  .set(setters.spaceless)
  .set(setters.lowercase)
  .validate(asserts.email)

/**
 * Customers image through gravatar.
 *
 * @type {Object}
 */
schema.virtual('image')
  .get(function() {
    return this.buildImage();
  })

/**
 * Customers optional company name.
 *
 * @type {String}
 */
schema.path('company')
  .set(setters.trim)
  .validate(asserts.length)
  .validate(asserts.alphanum)

/**
 * Customers address zipcode.
 *
 * @type {Number}
 */
schema.path('address.zip')
  .validate(asserts.zipcode)

/**
 * Customers address city or place.
 *
 * @type {String}
 */
schema.path('address.city')
  .index()
  .required()
  .set(setters.trim)
  .set(setters.capitalize)
  .validate(asserts.length)
  .validate(asserts.alphanum)

/**
 * Customers address street with street number.
 *
 * @type {String}
 */
schema.path('address.street')
  .set(setters.trim)
  .set(setters.capitalize)
  .validate(asserts.length)
  .validate(asserts.alphanum)
  ;

schema.statics = require('./statics');

schema.methods = require('./methods');

mongoose.model('Customer', schema);
