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

  schema.index({ email: true }, { unique: true });

  require('./statics')(app, schema);

  require('./methods')(app, schema);

  require('./sanitize')(app, schema);

  require('./validate')(app, schema);

  mongoose.model('Customer', schema);

};
