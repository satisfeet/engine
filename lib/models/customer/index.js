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

  schema.statics = require('./statics');

  require('./virtual')(schema);

  require('./sanitize')(schema);

  require('./validate')(schema);

  mongoose.model('Customer', schema);

};
