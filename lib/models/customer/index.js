var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    name: String,
    email: String,
    company: String,
    address: {
      street: String,
      city: String,
      zip: Number
    }
  });

  require('./statics')(app, schema);

  require('./virtual')(app, schema);

  require('./sanitize')(app, schema);

  require('./validate')(app, schema);

  mongoose.model('Customer', schema);

};
