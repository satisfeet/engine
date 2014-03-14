var mysql = require('mysql');

module.exports = function(app) {

  var db = createPool(app);

	require('./customers')(app, db);

};

function createPool(app) {
	var options = app.settings.database;

	return mysql.createPool(options.url);
}
