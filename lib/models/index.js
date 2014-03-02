var mysql = require('mysql');

module.exports = function(app) {

  var options = app.settings.database;

  app.db = mysql.createConnection(options);

};
