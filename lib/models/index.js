var mongoose = require('mongoose');

module.exports = function(app) {

  var plugins = require('./plugins');

  mongoose.plugin(plugins.findBy);
  mongoose.plugin(plugins.findOneBy);
  mongoose.plugin(plugins.toJSON);

  require('./customer')(app);

  require('./supplier')(app);

  require('./material')(app);

  require('./delivery')(app);

  require('./article')(app);

  require('./order')(app);

  mongoose.connect(app.settings.storage.url);

};
