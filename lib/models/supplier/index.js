var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    name: String,
    email: String,
    homepage: String,
    address: {
      street: String,
      city: String,
      zip: Number
    }
  });

  schema.index({ name: 1 }, { unique: true });

  mongoose.model('Supplier', schema);

};
