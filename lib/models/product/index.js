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

  schema.statics = require('./statics');

  schema.methods = require('./methods');

  require('./virtuals')(schema);

  mongoose.model('Product', schema);

};
