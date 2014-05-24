var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    title: String,
    image: {
      url: String
    },
    details: Object,
    pricing: {
      retail: Number
    },
    types: [
      String
    ]
  });

  require('./statics')(app, schema);

  require('./validate')(app, schema)

  require('./sanitize')(app, schema);

  mongoose.model('Product', schema);

};
