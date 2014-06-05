var mongoose = require('mongoose');

module.exports = function(app) {

  var Schema = mongoose.Schema;

  var schema = new Schema({
    name: String,
    email: String,
    company: String,
    address: {
      street: String,
      city: String,
      zip: Number
    }
  });

  require('./virtuals')(schema);

  schema.statics = require('./statics');

  mongoose.model('Customer', schema);

};
