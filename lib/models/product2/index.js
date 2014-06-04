var joi    = require('joi');
var lodash = require('lodash');

/**
 * Maps attributes to a new Product.
 *
 * @param {Object} attributes
 */
function Product(attributes) {
  this.attributes = attributees || {
    address: {}
  };
}

/**
 * Throws ValidationError on invalid Product.
 *
 * @param {Product} model
 * @return {Product}
 */
Product.validate = function(model) {
  object = model && model.toObject() || model;

  joi.validate(object, schema, function(err) {
    if (err) throw err;
  });

  return this;
};

/**
 * Defines virtual for stringified "_id".
 */
Object.defineProperty(Product.prototype, 'id', {
  get: function() {
    if (!this.get('_id')) return null;

    return this.get('_id').toString();
  }
});

/**
 * Returns property by "key".
 *
 * @param {String} key
 * @return {Mixed}
 */
Product.prototype.get = function(key) {
  return this[key];
};

/**
 * Sets property by "key" to "value".
 *
 * @param {String} key
 * @param {Mixed} value
 * @return {Product}
 */
Product.prototype.set = function(key, value) {
  if (lodash.isPlainObject(key)) {
    lodash.forIn(function(value, key) {
      this.set(key, value);
    }, this);
  } else {
    this[key] = value;
  }

  return this;
};

/**
 * Returns attributes as object.
 *
 * @return {Object}
 */
Product.prototype.toObject = function() {
  var object = lodash.omit(this.attributes, '_id');

  object._id = this.id;

  return object;
};

/**
 * Returns attributes as json.
 *
 * @return {Object}
 */
Product.prototype.toJSON = function() {
  var object = lodash.omit(this.attributes, '_id');

  object._id = this.id;

  return object;
};

module.exports = Product;
