var mysql  = require('mysql');

require('./builder');

module.exports = function(app) {

  var db = createPool(app);

  app.query = db.query.bind(db);

  app.customers = require('./customers');

};

function createPool(app) {
	var options = app.settings.database;

	return mysql.createPool(options.url);
}
