var mongodb = require('mongodb');

module.exports = function(app) {

  app.customers = require('./customers');

  connect(app, function(err, db) {
    if (err) throw err;

    app.customers.collection = db.collection('customers');
  });

};

function connect(app, callback) {
	var options = app.settings.storage;

	new mongodb.MongoClient().connect(options.url, callback);
}
