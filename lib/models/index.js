var monk = require('monk');

module.exports = function(app) {

  var db = monk(app.storage.url);

  require('./customer')(app, db);

};
