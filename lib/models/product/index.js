var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    name: String,
    state: {
      active: Boolean
    },
    pricing: {
      vat: Number,
      price: Number
    },
    categories: [
      String
    ]
  });

  schema.index({ name: 1 }, { unique: true });

  mongoose.model('Product', schema);

};
