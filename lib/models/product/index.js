var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    name: String,
    price: Number
  });

  require('./statics')(app, schema);

  require('./validate')(app, schema)

  require('./sanitize')(app, schema);

  mongoose.model('Product', schema);

};
