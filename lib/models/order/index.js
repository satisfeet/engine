var mongoose = require('mongoose');

var schema = new mongoose.Schema({
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

require('./virtual')(schema);

require('./validate')(schema);

schema.statics = require('./statics');

mongoose.model('Order', schema);
