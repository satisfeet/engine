var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    name: String,
    supplier: {
      ref: 'Supplier',
      type: mongoose.Schema.ObjectId
    },
    categories: [
      String
    ]
  });

  require('./indices')(app, schema);

  mongoose.model('Material', schema);

};
