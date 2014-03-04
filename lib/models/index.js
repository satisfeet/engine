var mysql = require('mysql');

module.exports = function(app) {

  var options = app.settings.database;

  var connection = mysql.createConnection(options.url);

  require('./customers')(app, connection);

};
