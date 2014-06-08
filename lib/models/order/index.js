var lodash   = require('lodash');
var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var Customer = mongoose.models.Customer;

var schema = new Schema({
  customer: {
    ref: 'Customer',
    type: ObjectId
  },
  items: [
    require('./schemas/item')
  ],
  state: {
    created: Date,
    shipped: Date,
    cleared: Date
  }
});

/**
 * Customer which the order is assigned to.
 *
 * @type {Customer}
 */
schema.path('customer')
  .required()
  .validate(function(value, done) {
    Customer.count({ _id: value }, function(err, result) {
      if (err) throw err;

      done(!!result);
    });
  });

/**
 * Items the customer purchased.
 *
 * @type {Array}
 */
schema.path('items')
  .required();

/**
 * Date when order was created.
 *
 * @type {Date}
 */
schema.path('state.created')
  .required()
  .default(new Date());

/**
 * Generated pricing of the complete order.
 *
 * @type {Number}
 */
schema.virtual('pricing.total')
  .get(function() {
    return this.calculateTotal();
  });

schema.statics = require('./statics');

schema.methods = require('./methods');

mongoose.model('Order', schema);
