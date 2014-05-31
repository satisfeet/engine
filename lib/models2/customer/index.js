var joi      = require('joi');
var lodash   = require('lodash');
var gravatar = require('gravatar');

var query  = require('./query');
var schema = require('./schema');

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
Customer.findAll = function*(params) {
  var condtions = {};

  query.search(params.search, conditions);
  query.filter(params.filter, conditions);

  var result = yield this.collection.find(conditions);

  return result.map(function(item) {
    return new this(item);
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
  var conditions = {};

  query.id(params.id, conditions);

  var result = yield this.collection.findOne(conditions);

  return new this(result);
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
  object = object.attributes || object;

  joi.validate(schema, object, function(err) {
    if (err) throw err;
  });

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

  var result = this.collection.insert(object);

  return new this(object);
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
    this.attributes.name = value;
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
    this.attributes.email = value;
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
    var email = this.get('email');

    return { url: generateUrl(email) };
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
    this.attributes.company = value;
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
    this.attributes.address = value;
  }
});

/**
 * Returns clone of "attributes".
 *
 * This transform should be used before persistance.
 *
 * @return {Object}
 */
Customer.prototype.toObject = function() {
  return this.cloneDeep(this.attributes);
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
  return lodash.omit(this, 'attributes');
};

module.exports = Customer;

/**
 * Returns gravatar image object.
 */
function generateUrl(email) {
  return gravatar.url(email || '', {
    default: 'mm',
    size: '500'
  });
}
