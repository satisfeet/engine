var lodash   = require('lodash');
var gravatar = require('gravatar');

var query    = require('./query');
var sanitize = require('./sanitize');
var validate = require('./validate');

/**
 * Sets up a attributes.
 *
 * @param {Object} attributes
 */
function Customer(attributes) {
  this.attributes = attributes || {
    address: {}
  };
}

/**
 * Returns array of customers matching "params".
 *
 * Performs a pseudo text search with "params.search" if set.
 * Performs a filter with key-value of "params.filter" if set.
 *
 * @param {Object} params
 * @return {Array}
 */
Customer.find = function*(params) {
  params = params || {};

  var conditions = {};

  query.search(params.search, conditions);
  query.filter(params.filter, conditions);

  var result = yield this.collection.find(conditions);

  return result.map(function(item) {
    return new Customer(item);
  });
};

/**
 * Returns instance of customer matching params.
 *
 * Performs an equals id search with "params.id".
 *
 * @param {Object} params
 * @return {Customer}
 */
Customer.findOne = function*(params) {
  params = params || {};

  var conditions = {};

  query.id(params.id, conditions);

  try {
    var result = yield this.collection.findOne(conditions);
  } catch(e) {
    return null;
  }
  if (!result) return null;

  return new Customer(result);
};

/**
 * Validates an object as Customer.
 *
 * Throws a ValidationError on invalid model.
 *
 * @param {Object} object
 * @return {Customer}
 */
Customer.validate = function(object) {
  object = object && object.attributes || object || {};

  validate.name(object.name);
  validate.email(object.email);
  validate.company(object.company);
  validate.address(object.address);
  validate.address.zip(object.address.zip);
  validate.address.city(object.address.city);
  validate.address.street(object.address.street);

  return this;
};

/**
 * Inserts an object as Customer.
 *
 * @param {Object} object
 * @return {Customer}
 */
Customer.insert = function*(object) {
  this.validate(object);

  var result = yield this.collection.insert(object);

  return new Customer(result);
};

/**
 * Updates a Customer.
 *
 * @param {Customer} model
 * @return {Customer}
 */
Customer.update = function*(model) {
  var conditions = {};

  this.validate(model);

  query.id(model.id, conditions);

  yield this.collection.update(conditions, model.toObject());

  return model;
};

/**
 * Removes a Customer.
 *
 * @param {Customer} model
 * @return {Customer}
 */
Customer.remove = function*(model) {
  var conditions = {};

  query.id(model.id, conditions);

  yield this.collection.remove(conditions);

  return model;
};

/**
 * Defines virtual for stringified "_id".
 *
 * @return {String}
 */
Object.defineProperty(Customer.prototype, 'id', {
  get: function() {
    if (!this.attributes._id) return null;

    return this.attributes._id.toString();
  }
});

/**
 * Defines virtuals for "name" property.
 *
 * @param {String}
 * @return {String}
 */
Object.defineProperty(Customer.prototype, 'name', {
  get: function() {
    return this.attributes.name;
  },
  set: function(value) {
    this.attributes.name = sanitize.name(value);
  }
});

/**
 * Defines virtuals for "email" property.
 *
 * @param {String}
 * @return {String}
 */
Object.defineProperty(Customer.prototype, 'email', {
  get: function() {
    return this.attributes.email;
  },
  set: function(value) {
    this.attributes.email = sanitize.email(value);
  }
});

/**
 * Defines virtual for "image" property.
 *
 * This will return an object which contains a gravatar url
 * which was generated with the "email" property.
 *
 * @return {Object}
 */
Object.defineProperty(Customer.prototype, 'image', {
  get: function() {
    var email = this.attributes.email || '';

    return {
      url: gravatar.url(email, {
        default: 'mm',
        size: '500'
      })
    };
  }
});

/**
 * Defines virtuals for "company" property.
 *
 * @param {String}
 * @return {String}
 */
Object.defineProperty(Customer.prototype, 'company', {
  get: function() {
    return this.attributes.company || null;
  },
  set: function(value) {
    this.attributes.company = sanitize.company(value);
  }
});

/**
 * Defines virtuals for "address" property.
 *
 * @param {Object}
 * @return {Object}
 */
Object.defineProperty(Customer.prototype, 'address', {
  get: function() {
    return this.attributes.address;
  },
  set: function(value) {
    this.attributes.address = sanitize.address(value);
  }
});

/**
 * Returns an attributes by "key".
 *
 * @param {String} key
 * @return {Mixed}
 */
Customer.prototype.get = function(key) {
  return this.attributes[key];
};

/**
 * Sets an attribute by "key" to "value".
 *
 * Can also be used with an object to merge properties.
 *
 * @param {String} key
 * @param {Mixed} value
 * @return {Customer}
 */
Customer.prototype.set = function(key, value) {
  if (lodash.isPlainObject(key)) {
    lodash.forIn(key, function(value, key) {
      this.set(key, value);
    }, this);
  }

  this.attributes[key] = value;

  return this;
};

/**
 * Returns clone of "attributes".
 *
 * This transform should be used before persistance.
 *
 * @return {Object}
 */
Customer.prototype.toObject = function() {
  var object = lodash.omit(this.attributes, '_id');

  object._id = this.attributes._id;

  return object;
};

/**
 * Returns clone of "this" without "attributes".
 *
 * This transform should be used if you want to include
 * getters.
 *
 * @return {Object}
 */
Customer.prototype.toJSON = function() {
  var object = lodash.omit(this.toObject(), '_id');

  object.id = this.id.toString();
  object.image = this.image;

  return object;
};

module.exports = Customer;
