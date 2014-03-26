var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    state: {
      created: Date,
      shipped: Date,
      cleared: Date
    },
    pricing: {
      terms: Object,
      total: Number
    },
    articles: [
      {
        article: {
          ref: 'Article',
          type: mongoose.Schema.ObjectId
        },
        quantity: Number,
        price: Number
      }
    ],
    customer: {
      ref: 'Customer',
      type: mongoose.Schema.ObjectId
    }
  });

  require('./statics')(app, schema);

  mongoose.model('Order', schema);

};
