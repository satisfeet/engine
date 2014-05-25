var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = mongoose.Schema({
    details: Object
  });

  require('./statics')(app, schema);

  mongoose.model('Article', schema);

};
