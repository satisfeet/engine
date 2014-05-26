var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    title: String,
    details: Object,
    pricing: {
      retail: Number
    },
    articles: [
      {
        ref: 'Article',
        type: mongoose.Schema.ObjectId
      }
    ]
  });

  require('./statics')(app, schema);

  require('./sanitize')(app, schema);

  require('./validate')(app, schema)

  mongoose.model('Product', schema);

};
