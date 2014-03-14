var mysql = require('mysql');

module.exports = function(app) {

  var pool = createPool(app);

	app.customers = require('./customers');

  app.query = pool.query.bind(pool);

};

function createPool(app) {
	var options = app.settings.database;

	return mysql.createConnection(options.url);
}
