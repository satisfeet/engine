var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    name: String,
    supplier: {
      ref: 'Merchant',
      type: mongoose.Schema.ObjectId
    },
    categories: [
      String
    ]
  });

  schema.index({ name: 1 }, { unique: true });

  mongoose.model('Material', schema);

};
