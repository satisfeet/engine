var mysql = require('mysql');

module.exports = function(app) {

  app.db = createConnection(app);

  app.customers = require('./customers');

};

function createConnection(app) {
  var options = app.settings.database;

  return mysql.createConnection(options.url);
}
