var mongoose = require('mongoose');

module.exports = function(app) {

  mongoose.connect(app.storage.url);

  mongoose.plugin(require('./options'));

  mongoose.plugin(require('./methods'));

  require('./customer')(app);

  require('./variety')(app);

  require('./article')(app);

  require('./order')(app);

};

