var sql   = require('sql');
var mysql = require('mysql');

module.exports = function(app) {

  var db = createPool(app);

  app.query = db.query.bind(db);

  app.customers = require('./customers');

  sql.setDialect('mysql');

};

function createPool(app) {
	var options = app.settings.database;

	return mysql.createPool(options.url);
}
