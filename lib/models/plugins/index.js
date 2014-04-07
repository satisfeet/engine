var mongoose = require('mongoose');

module.exports = function(app) {

  mongoose.plugin(require('./statics').findBy);

  mongoose.plugin(require('./statics').findOneBy);

  mongoose.plugin(require('./options').toJSON);

};
