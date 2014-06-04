var lodash = require('lodash');

var query    = require('./query');
var sanitize = require('./sanitize');
var validate = require('./validate');

/**
 * Maps attributes to a new Product.
 *
 * @param {Object} attributes
 */
function Product(attributes) {
  this.attributes = attributes || {
    details: {},
    pricing: {},
    articles: []
  };
}

/**
 * Returns array of Products matching params.
 *
 * @param {Object} params
 * @return {Array}
 */
Product.find = function*(params) {
  var conditions = {};

  var result = yield this.collection.find(conditions);

  return result.map(function(item) {
    return new Product(item);
  });
};

/**
 * Returns instance of Product matching params.
 *
 * @param {Object} params
 * @return {Product}
 */
Product.findOne = function*(params) {
  params = params || {};

  var conditions = {};

  query.id(params.id, conditions);

  try {
    var result = yield this.collection.findOne(conditions);
  } catch(e) {
    return null;
  }
  if (!result) return null;

  return new Product(result);
};

/**
 * Throws ValidationError on invalid Product.
 *
 * @param {Product} model
 * @return {Product}
 */
Product.validate = function(model) {
  object = model && model.toObject() || model || {};

  validate.title(object.title);
  validate.details(object.details);
  validate.pricing(object.pricing);
  validate.articles(object.articles);

  return this;
};

Object.defineProperty(Product.prototype, 'id', {
  get: function() {
    if (!this.attributes._id) return null;

    return this.attributes._id.toString();
  }
});

Object.defineProperty(Product.prototype, 'title', {
  get: function() {
    return this.attributes.title;
  },
  set: function(value) {
    this.attributes.title = sanitize.title(value);
  }
});

Object.defineProperty(Product.prototype, 'details', {
  get: function() {
    return this.attributes.details;
  },
  set: function(value) {
    this.attributes.details = sanitize.details(value);
  }
});

Object.defineProperty(Product.prototype, 'pricing', {
  get: function() {
    return this.attributes.pricing;
  },
  set: function(value) {
    this.attributes.pricing = sanitize.pricing(value);
  }
});

Object.defineProperty(Product.prototype, 'articles', {
  get: function() {
    return this.attributes.articles;
  },
  set: function(value) {
    this.attributes.articles = sanitize.articles(value);
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
