var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
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
  .alpha()
  .length(5, 40)
  .trim()
  .capitalize()

/**
 * Customers email address.
 *
 * @type {String}
 */
schema.path('email')
  .unique()
  .required()
  .email()
  .spaceless()
  .lowercase()

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
  .alphanum()
  .length(6, 40)
  .trim()

/**
 * Customers address zipcode.
 *
 * @type {Number}
 */
schema.path('address.zip')
  .index()
  .zip()

/**
 * Customers address city or place.
 *
 * @type {String}
 */
schema.path('address.city')
  .index()
  .required()
  .alphanum()
  .length(4, 40)
  .trim()
  .capitalize()

/**
 * Customers address street with street number.
 *
 * @type {String}
 */
schema.path('address.street')
  .index()
  .alphanum()
  .length(6, 60)
  .trim()
  .capitalize()

schema.statics = require('./statics');

schema.methods = require('./methods');

mongoose.model('Customer', schema);
