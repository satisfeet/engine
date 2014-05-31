var mongoose = require('mongoose');

module.exports = function(app) {

  var Schema   = mongoose.Schema;
  var ObjectId = mongoose.Schema.ObjectId;

  var schema = new Schema({
    title: String,
    details: Object,
    pricing: {
      retail: Number
    },
    articles: [
      {
        ref: 'Article',
        type: ObjectId
      }
    ]
  });

  require('./sanitize')(schema);

  require('./validate')(schema);

  schema.statics = require('./statics');

  mongoose.model('Product', schema);

};
