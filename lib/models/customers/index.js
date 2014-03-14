var manager = require('./manager');

module.exports = function(app, db) {

	app.customers = manager;

	app.customers.query = db.query.bind(db);

};
