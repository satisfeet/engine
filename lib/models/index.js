var mysql = require('mysql');

module.exports = function(app) {

	var connection = createConnection(app);

	app.customers = require('./customers');

  app.query = function(query, callback) {
    connection.query(query, callback);
  };

};

function createConnection(app) {
	var options = app.settings.database;

	return mysql.createConnection(options.url);
}
