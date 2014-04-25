var mongoose = require('mongoose');

var statics = require('./statics');
var options = require('./options');

module.exports = function(app) {

  mongoose.connect(app.storage.url);

  mongoose.plugin(statics.findOneBy);
  mongoose.plugin(statics.findBy);
  mongoose.plugin(options.toJSON);

  require('./customer')(app);

  require('./product')(app);

  require('./order')(app);

};
