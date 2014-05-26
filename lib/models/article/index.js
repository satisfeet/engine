var mongoose = require('mongoose');

module.exports = function(app) {

  var Schema   = mongoose.Schema;
  var ObjectId = mongoose.Schema.ObjectId;

  var schema = new Schema({
    product: {
      ref: 'Product',
      type: ObjectId
    },
    details: Object
  });

  schema.statics = require('./statics');

  mongoose.model('Article', schema);

};
