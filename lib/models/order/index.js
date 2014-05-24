var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    state: {
      created: Date,
      shipped: Date,
      cleared: Date
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

  require('./virtual')(app, schema);

  require('./validate')(app, schema);

  mongoose.model('Order', schema);

};
