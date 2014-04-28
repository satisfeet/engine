var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    name: String,
    price: Number
  });

  require('./validate')(app, schema);

  mongoose.model('Product', schema);

};
