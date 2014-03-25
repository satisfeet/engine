var mongoose = require('mongoose');

module.exports = function(app) {

  var options = app.settings.storage;

  require('./article')(app);

  require('./customer')(app);

  mongoose.connect(options.url);

};
