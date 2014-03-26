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
    ],
    materials: [
      {
        ref: 'Material',
        type: mongoose.Schema.ObjectId
      }
    ]
  });

  require('./indices')(app, schema);

  mongoose.model('Article', schema);

};
