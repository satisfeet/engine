var mongoose = require('mongoose');

module.exports = function(app) {

	var schema = new mongoose.Schema({
		name: String,
		email: String,
		homepage: String,
		address: {
			street: String,
			city: String,
			zip: String
		}
	});

	require('./indices')(app, schema);

	require('./statics')(app, schema);

	require('./options')(app, schema);

	mongoose.model('Supplier', schema);

};
