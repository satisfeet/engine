var mongoose = require('mongoose');

module.exports = function(app) {

  mongoose.connect(app.storage.url);

  mongoose.plugin(require('./options'));

  mongoose.plugin(require('./methods'));

  require('mongoose-assert')(mongoose);

  require('mongoose-setter')(mongoose);

  require('./customer');

  require('./product');

  require('./process');

};

