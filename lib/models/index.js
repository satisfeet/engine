var mongoose = require('mongoose');

module.exports = function(app) {

  mongoose.connect(app.storage.url);

  mongoose.plugin(require('./options'));

  mongoose.plugin(require('./methods'));

  require('./customer')(app);

  require('./product')(app);

	require('./order')(app);

};

