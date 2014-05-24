var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    image: {
      url: String
    },
    details: Object,
    pricing: {
      retail: Number
    }
  });

  require('./sanitize')(app, schema);

  require('./validate')(app, schema);

  mongoose.model('ArticleVariation', schema);

};
