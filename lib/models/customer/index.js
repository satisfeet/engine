var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    name: String,
    email: String,
    company: String,
    address: {
      street: String,
      city: String,
      zip: Number
    }
  });

  schema.index({ email: 1 }, { unique: true });

  require('./statics')(app, schema);

  require('./validation')(app, schema);

  mongoose.model('Customer', schema);

};
