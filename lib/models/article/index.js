var mongoose = require('mongoose');

module.exports = function(app) {

  require('./variation')(app);

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
    variations: [
      {
        ref: 'ArticleVariation',
        type: mongoose.Schema.ObjectId
      }
    ],
    description: String
  });

  require('./statics')(app, schema);

  require('./validate')(app, schema)

  require('./sanitize')(app, schema);

  mongoose.model('Article', schema);

};
