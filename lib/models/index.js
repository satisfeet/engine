var mongoose = require('mongoose');

module.exports = function(app) {

  var options = app.settings.storage;

  mongoose.connect(options.url);

  require('./plugins')(app);

  require('./incoming')(app);

  require('./outgoing')(app);

};
