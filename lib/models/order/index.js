var mongoose = require('mongoose');

module.exports = function(app) {

	var schema = new mongoose.Schema({
		state: {
			created: Date,
			shipped: Date,
			cleared: Date
		},
		pricing: {
			terms: Object,
			total: Number
		},
		articles: [
			{
				article: {
					ref: 'Article',
					type: mongoose.Schema.Types.ObjectId
				},
				quantity: Number,
				price: Number
			}
		],
		customer: {
			ref: 'Customer',
			type: mongoose.Schema.Types.ObjectId
		}
	});

	require('./statics')(app, schema);

	require('./options')(app, schema);

	mongoose.model('Order', schema);

};
