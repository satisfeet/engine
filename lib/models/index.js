var mongoose = require('mongoose');

module.exports = function(app) {

  mongoose.connect(app.storage.url);

  require('mongoose-assert')(mongoose);

  require('mongoose-setter')(mongoose);

  mongoose.plugin(require('./options'));

  mongoose.plugin(require('./methods'));

  require('./customer');

  require('./product');

  require('./article');

  require('./process');

};

