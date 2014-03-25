var mongoose = require('mongoose');

module.exports = function(app) {

	var schema = new mongoose.Schema({
		name: String,
		state: {
			active: Boolean
		},
		pricing: {
			vat: Number,
			price: Number
		},
		categories: [
			String
		]
	});

	require('./indices')(app, schema);

	require('./statics')(app, schema);

	require('./options')(app, schema);

	mongoose.model('Article', schema);

};
