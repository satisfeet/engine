var mongoose = require('mongoose');

module.exports = function(app) {

  var options = app.settings.storage;

  require('./customer')(app);

  require('./supplier')(app);

  require('./material')(app);

  require('./article')(app);

  require('./supply')(app);

  require('./order')(app);

  mongoose.connect(options.url);

};
