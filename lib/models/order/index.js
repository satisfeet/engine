var mongoose = require('mongoose');

module.exports = function(app) {

  var Schema   = mongoose.Schema;
  var ObjectId = mongoose.Schema.ObjectId;

  var schema = new Schema({
    state: {
      created: Date,
      shipped: Date,
      cleared: Date
    },
    articles: [
      {
        article: {
          ref: 'Article',
          type: ObjectId
        },
        quantity: Number,
        price: Number
      }
    ],
    customer: {
      ref: 'Customer',
      type: ObjectId
    }
  });

  require('./virtual')(schema);

  require('./validate')(schema);

  schema.statics = require('./statics');

  mongoose.model('Order', schema);

};
