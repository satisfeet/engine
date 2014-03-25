var mongoose = require('mongoose');

module.exports = function(app) {

  var options = app.settings.storage;

  require('./supplier')(app);

  require('./customer')(app);

  require('./material')(app);

  require('./article')(app);

  mongoose.connect(options.url);

};
