var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    title: String,
    image: {
      url: String
    },
    types: [
      String
    ],
    details: Object,
    pricing: {
      retail: Number
    },
    description: String
  });

  require('./statics')(app, schema);

  require('./validate')(app, schema)

  require('./sanitize')(app, schema);

  mongoose.model('Article', schema);

};
