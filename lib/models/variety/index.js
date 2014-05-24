var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    article: {
      ref: 'Article',
      type: mongoose.Schema.ObjectId
    },
    image: {
      url: String
    },
    details: Object,
    pricing: {
      retail: Number
    }
  });

  require('./statics')(app, schema);

  require('./sanitize')(app, schema);

  require('./validate')(app, schema);

  mongoose.model('Variety', schema);

};
