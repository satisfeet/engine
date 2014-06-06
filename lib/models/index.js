var mongoose = require('mongoose');

module.exports = function(app) {

  mongoose.connect(app.storage.url);

  require('./plugins');

  require('./customer');

  require('./product');

  require('./article');

  require('./order');

};

