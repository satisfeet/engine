var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    product: {
      ref: 'Product',
      type: mongoose.Schema.ObjectId
    },
    details: Object
  });

  require('./statics')(app, schema);

  mongoose.model('Article', schema);

};
