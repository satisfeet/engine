var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  product: {
    ref: 'Product',
    type: mongoose.Schema.ObjectId
  },
  variation: Object
});

schema.statics = require('./statics');

mongoose.model('Article', schema);
